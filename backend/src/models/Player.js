import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Player = sequelize.define('Player', {
  name:       { type: DataTypes.STRING, allowNull: false },
  team:       { type: DataTypes.STRING },
  position:   { type: DataTypes.STRING },
  height:     { type: DataTypes.STRING },
  weight:     { type: DataTypes.STRING }
});
