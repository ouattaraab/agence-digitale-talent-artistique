module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userType: {
      type: DataTypes.ENUM('admin', 'artist', 'client'),
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    firebaseUserId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active'
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    paranoid: true, // Soft delete
  });

  User.associate = models => {
    // Artist Profile Association
    User.hasOne(models.ArtistProfile, {
      foreignKey: 'userId',
      as: 'artistProfile'
    });

    // Client Profile Association
    User.hasOne(models.ClientProfile, {
      foreignKey: 'userId',
      as: 'clientProfile'
    });

    // Bookings Association
    User.hasMany(models.Booking, {
      foreignKey: 'clientId',
      as: 'clientBookings'
    });

    // Reviews Association
    User.hasMany(models.Review, {
      foreignKey: 'reviewerId',
      as: 'givenReviews'
    });

    User.hasMany(models.Review, {
      foreignKey: 'revieweeId',
      as: 'receivedReviews'
    });

    // Notifications Association
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications'
    });
  };

  return User;
};