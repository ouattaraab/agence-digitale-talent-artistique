const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../middleware/authMiddleware');
const { PortfolioMedia, ArtistProfile } = require('../models');

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single('file');

// Check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif|mp4|mp3|wav|pdf/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Erreur: Images, Audio, Vidéo et PDF uniquement!');
  }
}

// @route   POST api/uploads
// @desc    Upload file
// @access  Private
router.post('/', authMiddleware, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier sélectionné' });
    }
    
    // File uploaded successfully
    res.json({
      success: true,
      fileName: req.file.filename,
      filePath: `/uploads/${req.file.filename}`
    });
  });
});

// @route   POST api/uploads/portfolio
// @desc    Add media to artist portfolio
// @access  Private (artists only)
router.post('/portfolio', authMiddleware, async (req, res) => {
  try {
    // Check if user is an artist
    if (req.user.userType !== 'artist') {
      return res.status(403).json({ message: 'Accès non autorisé. Profil artiste requis.' });
    }
    
    // Get artist profile
    const artistProfile = await ArtistProfile.findOne({
      where: { userId: req.user.id }
    });
    
    if (!artistProfile) {
      return res.status(404).json({ message: 'Profil artiste non trouvé' });
    }
    
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      
      if (!req.file) {
        return res.status(400).json({ message: 'Aucun fichier sélectionné' });
      }
      
      const { title, description, mediaType, order, isPublic } = req.body;
      
      // Determine media type if not provided
      let detectedMediaType = mediaType;
      if (!detectedMediaType) {
        const ext = path.extname(req.file.originalname).toLowerCase();
        if (/\.(jpg|jpeg|png|gif)$/.test(ext)) {
          detectedMediaType = 'image';
        } else if (/\.(mp4|mov|avi|wmv)$/.test(ext)) {
          detectedMediaType = 'video';
        } else if (/\.(mp3|wav|ogg)$/.test(ext)) {
          detectedMediaType = 'audio';
        }
      }
      
      // Create portfolio media entry
      const portfolioMedia = await PortfolioMedia.create({
        artistProfileId: artistProfile.id,
        mediaType: detectedMediaType,
        title,
        description,
        url: `/uploads/${req.file.filename}`,
        order: order || 0,
        isPublic: isPublic !== 'false'
      });
      
      res.status(201).json({
        message: 'Média ajouté au portfolio avec succès',
        portfolioMedia
      });
    });
  } catch (err) {
    console.error('Add to portfolio error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// @route   DELETE api/uploads/portfolio/:id
// @desc    Remove media from artist portfolio
// @access  Private (artists only)
router.delete('/portfolio/:id', authMiddleware, async (req, res) => {
  try {
    const portfolioMedia = await PortfolioMedia.findByPk(req.params.id, {
      include: [{
        model: ArtistProfile,
        as: 'artistProfile'
      }]
    });
    
    if (!portfolioMedia) {
      return res.status(404).json({ message: 'Média non trouvé' });
    }
    
    // Check if user owns this media
    if (
      portfolioMedia.artistProfile.userId !== req.user.id &&
      req.user.userType !== 'admin'
    ) {
      return res.status(403).json({ message: 'Non autorisé à supprimer ce média' });
    }
    
    // Delete file from server
    const filePath = path.join(__dirname, '..', '..', portfolioMedia.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    // Delete record from database
    await portfolioMedia.destroy();
    
    res.json({ message: 'Média supprimé du portfolio avec succès' });
  } catch (err) {
    console.error('Delete portfolio media error:', err.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;