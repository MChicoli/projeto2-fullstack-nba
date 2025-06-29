import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import { Op } from 'sequelize';
import { Player } from '../models/Player.js';
import { verifyToken, logActivity } from './middleware.js';
import cache from 'memory-cache';

const router = Router();

router.get(
  '/search',
  verifyToken,
  logActivity,
  [query('q').trim().escape()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { q } = req.query;
      const cacheKey = `search-${q}`; 
      const cachedResult = cache.get(cacheKey);
      if (cachedResult) {
        return res.json(cachedResult);
      }

      const players = await Player.findAll({
        where: { name: { [Op.iLike]: `%${q}%` } }
      });

      cache.put(cacheKey, players, 300000);

      res.json(players);
      
    } catch (err) {
      console.error('Erro em /search:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

export default router;