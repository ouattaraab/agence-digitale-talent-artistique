const express = require('express');
const router = express.Router();
const { Booking, ArtistProfile, User, Contract, Notification } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/bookings
// @desc    Get user's bookings (as client or artist)
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    let bookings;
    
    if (req.user.userType === 'client') {
      // Get bookings as client
      bookings = await Booking.findAll({
        where: { clientId: req.user.id },
        include: [
          {
            model: ArtistProfile,
            as: 'artist',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['firstName', 'lastName', 'profilePicture']
              }
            ]
          },
          {
            model: Contract,
            as: 'contract',
            attributes: ['id', 'status', 'contractNumber']
          }
        ],
        order: [['eventDate', 'DESC']]
      });
    } else if (req.user.userType === 'artist') {
      // Get artist profile id
      const artistProfile = await ArtistProfile.findOne({
        where: { userId: req.user.id }
      });
      
      if (!artistProfile) {
        return res.status(404).json({ message: 'Profil artiste non trouvé' });
      }
      
      // Get bookings as artist
      bookings = await Booking.findAll({
        where: { artistId: artistProfile.id },
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['id', 'firstName', 'lastName', 'profilePicture']
          },
          {
            model: Contract,
            as: 'contract',
            attributes: ['id', 'status', 'contractNumber']
          }
        ],
        order: [['eventDate', 'DESC']]
      });
    } else {
      // Admin can see all bookings
      bookings = await Booking.findAll({
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: ArtistProfile,
            as: 'artist',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['firstName', 'lastName', 'email']
              }
            ]
          },
          {
            model: Contract,
            as: 'contract',
            attributes: ['id', 'status', 'contractNumber']
          }
        ],
        order: [['eventDate', 'DESC']]
      });
    }
    
    res.json(bookings);
  } catch (err) {
    console.error('Get bookings error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   GET api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'client',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'profilePicture']
        },
        {
          model: ArtistProfile,
          as: 'artist',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['firstName', 'lastName', 'email', 'phone', 'profilePicture']
            }
          ]
        },
        {
          model: Contract,
          as: 'contract'
        }
      ]
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    
    // Check if user is authorized to view this booking
    if (
      req.user.id !== booking.clientId &&
      req.user.id !== booking.artist.userId &&
      req.user.userType !== 'admin'
    ) {
      return res.status(403).json({ message: 'Non autorisé à voir cette réservation' });
    }
    
    res.json(booking);
  } catch (err) {
    console.error('Get booking error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   POST api/bookings
// @desc    Create a new booking
// @access  Private (clients only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is a client
    if (req.user.userType !== 'client') {
      return res.status(403).json({ message: 'Accès non autorisé. Profil client requis.' });
    }
    
    const {
      artistId,
      clientProfileId,
      eventDate,
      startTime,
      endTime,
      eventType,
      eventLocation,
      eventDetails,
      totalAmount,
      depositAmount,
      specialRequirements
    } = req.body;
    
    // Validate artist exists
    const artistProfile = await ArtistProfile.findByPk(artistId);
    if (!artistProfile) {
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }
    
    // Create booking
    const booking = await Booking.create({
      clientId: req.user.id,
      artistId,
      clientProfileId,
      eventDate,
      startTime,
      endTime,
      eventType,
      eventLocation,
      eventDetails,
      totalAmount,
      depositAmount,
      specialRequirements,
      status: 'pending'
    });
    
    // Create notification for artist
    await Notification.create({
      userId: artistProfile.userId,
      type: 'booking_request',
      title: 'Nouvelle demande de réservation',
      message: `Vous avez reçu une nouvelle demande de réservation pour un événement le ${new Date(eventDate).toLocaleDateString('fr-FR')}.`,
      relatedId: booking.id,
      relatedType: 'Booking',
      redirectUrl: `/artist/bookings/${booking.id}`
    });
    
    res.status(201).json({
      message: 'Demande de réservation créée avec succès',
      booking
    });
  } catch (err) {
    console.error('Create booking error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   PUT api/bookings/:id/status
// @desc    Update booking status (accept, reject, modify)
// @access  Private (artist or admin)
router.put('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    // Validate status
    if (!['accepted', 'rejected', 'modified'].includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }
    
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: ArtistProfile,
          as: 'artist'
        },
        {
          model: User,
          as: 'client'
        }
      ]
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    
    // Check if user is authorized to update this booking
    const artistProfile = await ArtistProfile.findOne({
      where: { userId: req.user.id }
    });
    
    if (
      (artistProfile && booking.artistId !== artistProfile.id) &&
      req.user.userType !== 'admin'
    ) {
      return res.status(403).json({ message: 'Non autorisé à modifier cette réservation' });
    }
    
    // Update booking status
    await booking.update({
      status,
      notes: notes || booking.notes
    });
    
    // Create notification for client
    let notificationTitle, notificationMessage;
    
    if (status === 'accepted') {
      notificationTitle = 'Réservation acceptée';
      notificationMessage = `Votre réservation pour le ${new Date(booking.eventDate).toLocaleDateString('fr-FR')} a été acceptée.`;
    } else if (status === 'rejected') {
      notificationTitle = 'Réservation refusée';
      notificationMessage = `Votre réservation pour le ${new Date(booking.eventDate).toLocaleDateString('fr-FR')} a été refusée.`;
    } else {
      notificationTitle = 'Réservation modifiée';
      notificationMessage = `Votre réservation pour le ${new Date(booking.eventDate).toLocaleDateString('fr-FR')} a été modifiée.`;
    }
    
    await Notification.create({
      userId: booking.clientId,
      type: 'booking_update',
      title: notificationTitle,
      message: notificationMessage,
      relatedId: booking.id,
      relatedType: 'Booking',
      redirectUrl: `/client/bookings/${booking.id}`
    });
    
    res.json({
      message: `Statut de la réservation mis à jour: ${status}`,
      booking
    });
  } catch (err) {
    console.error('Update booking status error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;