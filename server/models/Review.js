module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Bookings',
        key: 'id'
      }
    },
    reviewerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    revieweeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    reviewType: {
      type: DataTypes.ENUM('client_to_artist', 'artist_to_client'),
      allowNull: false
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    }
  }, {
    timestamps: true,
    paranoid: true, // Soft delete
  });

  Review.associate = models => {
    // Booking Association
    Review.belongsTo(models.Booking, {
      foreignKey: 'bookingId',
      as: 'booking'
    });

    // Reviewer Association
    Review.belongsTo(models.User, {
      foreignKey: 'reviewerId',
      as: 'reviewer'
    });

    // Reviewee Association
    Review.belongsTo(models.User, {
      foreignKey: 'revieweeId',
      as: 'reviewee'
    });
  };

  return Review;
};