import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import bcrypt from 'bcrypt';

export const User = sequelize.define('User', {
  email:   { type: DataTypes.STRING, unique: true, allowNull: false },
  password:{ type: DataTypes.STRING, allowNull: false }
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 12);
});
