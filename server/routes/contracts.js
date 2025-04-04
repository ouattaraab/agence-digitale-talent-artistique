const express = require('express');
const router = express.Router();
const { Contract, Booking, User, ArtistProfile, Notification } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');

// @route   GET api/contracts/:id
// @desc    Get contract by ID
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id, {
      include: [{
        model: Booking,
        as: 'booking',
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['id', 'firstName', 'lastName', 'email']
          },
          {
            model: ArtistProfile,
            as: 'artist',
            include: [{
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }]
          }
        ]
      }]
    });
    
    if (!contract) {
      return res.status(404).json({ message: 'Contrat non trouvé' });
    }
    
    // Check if user is authorized to view this contract
    if (
      req.user.id !== contract.booking.clientId &&
      req.user.id !== contract.booking.artist.userId &&
      req.user.userType !== 'admin'
    ) {
      return res.status(403).json({ message: 'Non autorisé à voir ce contrat' });
    }
    
    res.json(contract);
  } catch (err) {
    console.error('Get contract error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   POST api/contracts/generate
// @desc    Generate contract for booking
// @access  Private (admin or artist)
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { bookingId, additionalTerms } = req.body;
    
    // Get booking details
    const booking = await Booking.findByPk(bookingId, {
      include: [
        {
          model: User,
          as: 'client'
        },
        {
          model: ArtistProfile,
          as: 'artist',
          include: [{
            model: User,
            as: 'user'
          }]
        }
      ]
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    
    // Check if user is authorized
    if (
      req.user.id !== booking.artist.userId &&
      req.user.userType !== 'admin'
    ) {
      return res.status(403).json({ message: 'Non autorisé à générer ce contrat' });
    }
    
    // Check if booking already has a contract
    if (booking.contractId) {
      return res.status(400).json({ message: 'Cette réservation a déjà un contrat' });
    }
    
    // Generate contract content (simplified for this example)
    const contractNumber = `ADTA-${new Date().getFullYear()}-${uuidv4().substring(0, 8)}`;
    
    const contractContent = `
      CONTRAT DE PRESTATION ARTISTIQUE
      
      Numéro de contrat: ${contractNumber}
      Date: ${new Date().toLocaleDateString('fr-FR')}
      
      ENTRE LES SOUSSIGNÉS:
      
      Artiste:
      ${booking.artist.stageName}
      Représenté par: ${booking.artist.user.firstName} ${booking.artist.user.lastName}
      Email: ${booking.artist.user.email}
      
      ET
      
      Client:
      ${booking.client.firstName} ${booking.client.lastName}
      Email: ${booking.client.email}
      
      PRESTATION:
      Type d'événement: ${booking.eventType}
      Date: ${new Date(booking.eventDate).toLocaleDateString('fr-FR')}
      Heure: ${booking.startTime} - ${booking.endTime}
      Lieu: ${booking.eventLocation}
      
      CONDITIONS FINANCIÈRES:
      Montant total: ${booking.totalAmount} FCFA
      Acompte: ${booking.depositAmount} FCFA
      Solde à régler: ${booking.totalAmount - booking.depositAmount} FCFA
      
      TERMES ET CONDITIONS:
      1. L'artiste s'engage à réaliser la prestation définie ci-dessus.
      2. Le client s'engage à verser l'acompte à la signature du contrat.
      3. Le solde sera réglé à la fin de la prestation.
      4. En cas d'annulation par le client moins de 72h avant l'événement, l'acompte reste acquis à l'artiste.
      5. En cas d'annulation par l'artiste, l'acompte sera intégralement remboursé.
      
      ${additionalTerms ? `CONDITIONS PARTICULIÈRES:
      ${additionalTerms}` : ''}
    `;
    
    // Create contract
    const contract = await Contract.create({
      bookingId,
      contractNumber,
      content: contractContent,
      status: 'draft',
      additionalTerms
    });
    
    // Update booking with contract ID
    await booking.update({ contractId: contract.id });
    
    // Create notification for client
    await Notification.create({
      userId: booking.clientId,
      type: 'contract_created',
      title: 'Nouveau contrat disponible',
      message: `Un contrat pour votre réservation du ${new Date(booking.eventDate).toLocaleDateString('fr-FR')} a été généré.`,
      relatedId: contract.id,
      relatedType: 'Contract',
      redirectUrl: `/client/contracts/${contract.id}`
    });
    
    res.status(201).json({
      message: 'Contrat généré avec succès',
      contract
    });
  } catch (err) {
    console.error('Generate contract error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   PUT api/contracts/:id/sign
// @desc    Sign contract (artist or client)
// @access  Private
router.put('/:id/sign', authMiddleware, async (req, res) => {
  try {
    const { signature } = req.body;
    
    if (!signature) {
      return res.status(400).json({ message: 'Signature requise' });
    }
    
    const contract = await Contract.findByPk(req.params.id, {
      include: [{
        model: Booking,
        as: 'booking',
        include: [
          {
            model: User,
            as: 'client'
          },
          {
            model: ArtistProfile,
            as: 'artist',
            include: [{
              model: User,
              as: 'user'
            }]
          }
        ]
      }]
    });
    
    if (!contract) {
      return res.status(404).json({ message: 'Contrat non trouvé' });
    }
    
    const booking = contract.booking;
    const isArtist = req.user.id === booking.artist.userId;
    const isClient = req.user.id === booking.clientId;
    
    // Check if user is authorized to sign this contract
    if (!isArtist && !isClient) {
      return res.status(403).json({ message: 'Non autorisé à signer ce contrat' });
    }
    
    // Update contract with signature
    let updateData = {};
    let newStatus = contract.status;
    
    if (isArtist) {
      updateData = {
        artistSignature: signature,
        artistSignedAt: new Date()
      };
      
      if (contract.status === 'draft') {
        newStatus = 'sent_to_client';
      } else if (contract.status === 'sent_to_artist' && contract.clientSignature) {
        newStatus = 'completed';
      }
    } else if (isClient) {
      updateData = {
        clientSignature: signature,
        clientSignedAt: new Date()
      };
      
      if (contract.status === 'draft') {
        newStatus = 'sent_to_artist';
      } else if (contract.status === 'sent_to_client' && contract.artistSignature) {
        newStatus = 'completed';
      }
    }
    
    updateData.status = newStatus;
    
    await contract.update(updateData);
    
    // Create notification for the other party
    let notificationUserId, notificationTitle, notificationMessage;
    
    if (isArtist) {
      notificationUserId = booking.clientId;
      notificationTitle = 'Contrat signé par l\'artiste';
      notificationMessage = `Le contrat pour votre réservation du ${new Date(booking.eventDate).toLocaleDateString('fr-FR')} a été signé par l'artiste.`;
    } else {
      notificationUserId = booking.artist.userId;
      notificationTitle = 'Contrat signé par le client';
      notificationMessage = `Le contrat pour la réservation du ${new Date(booking.eventDate).toLocaleDateString('fr-FR')} a été signé par le client.`;
    }
    
    await Notification.create({
      userId: notificationUserId,
      type: 'contract_signed',
      title: notificationTitle,
      message: notificationMessage,
      relatedId: contract.id,
      relatedType: 'Contract',
      redirectUrl: isArtist ? `/client/contracts/${contract.id}` : `/artist/contracts/${contract.id}`
    });
    
    res.json({
      message: 'Contrat signé avec succès',
      contract
    });
  } catch (err) {
    console.error('Sign contract error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;