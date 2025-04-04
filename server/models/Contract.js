module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
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
    contractNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    artistSignature: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    artistSignedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    clientSignature: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    clientSignedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'sent_to_artist', 'artist_signed', 'sent_to_client', 'completed', 'cancelled'),
      defaultValue: 'draft'
    },
    pdfUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    additionalTerms: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true, // Soft delete
  });

  Contract.associate = models => {
    // Booking Association
    Contract.belongsTo(models.Booking, {
      foreignKey: 'bookingId',
      as: 'booking'
    });

    // Contract has one booking (inverse of above)
    Contract.hasOne(models.Booking, {
      foreignKey: 'contractId',
      as: 'bookingDetails'
    });
  };

  return Contract;
};