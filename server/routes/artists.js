const express = require('express');
const router = express.Router();
const { ArtistProfile, User, PortfolioMedia, Review, Sequelize } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const { Op } = Sequelize;

// @route   GET api/artists
// @desc    Get all artists with filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { artistType, search, minRating, maxRate, minRate, page = 1, limit = 10 } = req.query;
    
    // Build filters
    const filters = {};
    if (artistType) filters.artistType = artistType;
    if (minRating) filters.averageRating = { [Op.gte]: parseFloat(minRating) };
    if (minRate) filters.baseRate = { [Op.gte]: parseFloat(minRate) };
    if (maxRate) filters.baseRate = { ...filters.baseRate, [Op.lte]: parseFloat(maxRate) };
    
    // Build search condition
    let searchCondition = {};
    if (search) {
      searchCondition = {
        [Op.or]: [
          { stageName: { [Op.iLike]: `%${search}%` } },
          { biography: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Fetch artists with filters
    const artists = await ArtistProfile.findAndCountAll({
      where: { ...filters, ...searchCondition, isVerified: true },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'profilePicture']
        },
        {
          model: PortfolioMedia,
          as: 'portfolioMedia',
          where: { isPublic: true },
          required: false
        }
      ],
      limit: parseInt(limit),
      offset: offset,
      order: [['averageRating', 'DESC']]
    });
    
    // Format response with pagination info
    res.json({
      artists: artists.rows,
      pagination: {
        total: artists.count,
        page: parseInt(page),
        pages: Math.ceil(artists.count / limit)
      }
    });
  } catch (err) {
    console.error('Get artists error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   GET api/artists/:id
// @desc    Get artist by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const artist = await ArtistProfile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'profilePicture', 'email']
        },
        {
          model: PortfolioMedia,
          as: 'portfolioMedia',
          where: { isPublic: true },
          required: false
        }
      ]
    });
    
    if (!artist) {
      return res.status(404).json({ message: 'Artiste non trouvé' });
    }
    
    res.json(artist);
  } catch (err) {
    console.error('Get artist error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   GET api/artists/me
// @desc    Get current user's artist profile
// @access  Private (Artist only)
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Check if user is an artist
    if (req.user.userType !== 'artist') {
      return res.status(403).json({ message: 'Accès non autorisé. Profil artiste requis.' });
    }
    
    // Find artist profile
    const artistProfile = await ArtistProfile.findOne({
      where: { userId: req.user.id },
      include: [
        {
          model: PortfolioMedia,
          as: 'portfolioMedia'
        }
      ]
    });
    
    if (!artistProfile) {
      return res.status(404).json({ message: 'Profil artiste non trouvé' });
    }
    
    res.json(artistProfile);
  } catch (err) {
    console.error('Get artist profile error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   POST api/artists
// @desc    Create or update artist profile
// @access  Private (Artists only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if user is an artist
    if (req.user.userType !== 'artist') {
      return res.status(403).json({ message: 'Accès non autorisé. Profil artiste requis.' });
    }
    
    const {
      stageName,
      artistType,
      otherArtistType,
      biography,
      experience,
      baseRate,
      rateType,
      genres,
      languages,
      equipment,
      requirements
    } = req.body;
    
    // Check if profile already exists
    let artistProfile = await ArtistProfile.findOne({
      where: { userId: req.user.id }
    });
    
    if (artistProfile) {
      // Update existing profile
      artistProfile = await artistProfile.update({
        stageName,
        artistType,
        otherArtistType,
        biography,
        experience,
        baseRate,
        rateType,
        genres,
        languages,
        equipment,
        requirements
      });
      
      res.json({ message: 'Profil artiste mis à jour avec succès', artistProfile });
    } else {
      // Create new profile
      artistProfile = await ArtistProfile.create({
        userId: req.user.id,
        stageName,
        artistType,
        otherArtistType,
        biography,
        experience,
        baseRate,
        rateType,
        genres,
        languages,
        equipment,
        requirements
      });
      
      res.status(201).json({ message: 'Profil artiste créé avec succès', artistProfile });
    }
  } catch (err) {
    console.error('Create/update artist profile error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   DELETE api/artists/:id
// @desc    Delete artist profile
// @access  Private (Artists only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const artistProfile = await ArtistProfile.findByPk(req.params.id);
    
    if (!artistProfile) {
      return res.status(404).json({ message: 'Profil artiste non trouvé' });
    }
    
    // Check if user owns this profile
    if (artistProfile.userId !== req.user.id && req.user.userType !== 'admin') {
      return res.status(403).json({ message: 'Non autorisé à supprimer ce profil' });
    }
    
    await artistProfile.destroy();
    res.json({ message: 'Profil artiste supprimé avec succès' });
  } catch (err) {
    console.error('Delete artist profile error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;