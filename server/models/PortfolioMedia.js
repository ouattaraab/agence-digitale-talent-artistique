module.exports = (sequelize, DataTypes) => {
  const PortfolioMedia = sequelize.define('PortfolioMedia', {
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
    mediaType: {
      type: DataTypes.ENUM('image', 'video', 'audio'),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in seconds for video/audio'
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Order for display in portfolio'
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    paranoid: true, // Soft delete
  });

  PortfolioMedia.associate = models => {
    // Artist Profile Association
    PortfolioMedia.belongsTo(models.ArtistProfile, {
      foreignKey: 'artistProfileId',
      as: 'artistProfile'
    });
  };

  return PortfolioMedia;
};