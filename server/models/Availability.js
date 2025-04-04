module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('Availability', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    artistProfileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'ArtistProfiles',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
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
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'false means blocked time'
    },
    recurrenceRule: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'RRULE format for recurring availability'
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true, // Soft delete
  });

  Availability.associate = models => {
    // Artist Profile Association
    Availability.belongsTo(models.ArtistProfile, {
      foreignKey: 'artistProfileId',
      as: 'artistProfile'
    });
  };

  return Availability;
};