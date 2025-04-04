module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    clientId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    artistId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ArtistProfiles',
        key: 'id'
      }
    },
    clientProfileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ClientProfiles',
        key: 'id'
      }
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDetails: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'modified', 'rejected', 'cancelled', 'completed'),
      defaultValue: 'pending'
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    depositAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    depositPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    depositPaidAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    balancePaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    balancePaidAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    contractId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Contracts',
        key: 'id'
      }
    },
    clientFeedbackProvided: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    artistFeedbackProvided: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    specialRequirements: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true, // Soft delete
  });

  Booking.associate = models => {
    // User (Client) Association
    Booking.belongsTo(models.User, {
      foreignKey: 'clientId',
      as: 'client'
    });

    // Artist Association
    Booking.belongsTo(models.ArtistProfile, {
      foreignKey: 'artistId',
      as: 'artist'
    });

    // Client Profile Association
    Booking.belongsTo(models.ClientProfile, {
      foreignKey: 'clientProfileId',
      as: 'clientProfile'
    });

    // Contract Association
    Booking.belongsTo(models.Contract, {
      foreignKey: 'contractId',
      as: 'contract'
    });

    // Review Association
    Booking.hasOne(models.Review, {
      foreignKey: 'bookingId',
      as: 'review'
    });
  };

  return Booking;
};