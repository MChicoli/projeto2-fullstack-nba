// src/models/User.js - VERSÃO FINAL CORRETA
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import bcrypt from 'bcrypt';

const hashPassword = async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 12);
  }
};

export const User = sequelize.define('User', {
  email:   { type: DataTypes.STRING, unique: true, allowNull: false },
  password:{ type: DataTypes.STRING, allowNull: false }
}, {
  hooks: {
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword
  }
});