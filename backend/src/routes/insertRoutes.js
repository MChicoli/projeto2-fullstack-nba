import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Player } from '../models/Player.js';
import { verifyToken } from './middleware.js';

const router = Router();

router.post('/insert',
  verifyToken,
  [
    body('name').notEmpty().trim().escape(),
    body('team').optional().trim().escape(),
    body('position').optional().trim().escape(),
    body('height').optional().trim().escape(),
    body('weight').optional().trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const player = await Player.create(req.body);
      res.status(201).json(player);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao inserir jogador' });
    }
  }
);
router.post('/insert/bulk',
  verifyToken,
  async (req, res) => {
    const playersData = req.body;

    if (!Array.isArray(playersData) || playersData.length === 0) {
      return res.status(400).json({ error: 'O corpo da requisição deve ser um array de jogadores.' });
    }

    try {
      const players = await Player.bulkCreate(playersData);
      res.status(201).json(players);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao inserir jogadores em massa' });
    }
  }
);
export default router;