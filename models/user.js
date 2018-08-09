import bcrypt from 'bcryptjs';

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Todo, {
      foreignKey : 'userId',
      onDelete: 'CASCADE'
    })
  };

  const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
  }

  User.beforeCreate((user) => {
    const hash = hashPassword(user.password);
    if(hash) {
      user.password = hash;
    }
  });

  User.beforeUpdate((user) => {
    const hash = hashPassword(user.password);
    if(hash) {
      user.password = hash;
    }
  });

  User.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };


  return User;
};

export default UserModel;
