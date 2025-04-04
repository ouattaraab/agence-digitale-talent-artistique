module.exports = (sequelize, DataTypes) => {
  const ArtistProfile = sequelize.define('ArtistProfile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    stageName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artistType: {
      type: DataTypes.ENUM('musician', 'dj', 'dancer', 'comedian', 'painter', 'performer', 'other'),
      allowNull: false
    },
    otherArtistType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    baseRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      comment: 'Base rate per hour or per event'
    },
    rateType: {
      type: DataTypes.ENUM('hourly', 'per_event'),
      defaultValue: 'per_event'
    },
    genres: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    equipment: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Equipment the artist can provide'
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Technical or other requirements for performance'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Has admin verified the artist profile'
    },
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true
    },
    totalBookings: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    responseRate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      comment: 'Percentage of booking requests responded to'
    },
    featuredUntil: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Date until which this artist is featured'
    },
    subscriptionTier: {
      type: DataTypes.ENUM('free', 'premium'),
      defaultValue: 'free'
    },
    subscriptionExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true, // Soft delete
  });

  ArtistProfile.associate = models => {
    // User Association
    ArtistProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    // Portfolio Media
    ArtistProfile.hasMany(models.PortfolioMedia, {
      foreignKey: 'artistProfileId',
      as: 'portfolioMedia'
    });

    // Bookings
    ArtistProfile.hasMany(models.Booking, {
      foreignKey: 'artistId',
      as: 'bookings'
    });

    // Availability
    ArtistProfile.hasMany(models.Availability, {
      foreignKey: 'artistProfileId',
      as: 'availabilities'
    });
  };

  return ArtistProfile;
};