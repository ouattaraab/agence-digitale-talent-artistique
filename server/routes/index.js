const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const artistsRoutes = require('./artists');
const bookingsRoutes = require('./bookings');
const contractsRoutes = require('./contracts');
const uploadsRoutes = require('./uploads');

// Use routes
router.use('/auth', authRoutes);
router.use('/artists', artistsRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/contracts', contractsRoutes);
router.use('/uploads', uploadsRoutes);

module.exports = router;