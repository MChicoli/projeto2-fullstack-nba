// src/routes/searchRoutes.js
import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import { Op } from 'sequelize';          // 👈 necessário p/ operador iLike
import { Player } from '../models/Player.js';
import { verifyToken } from './middleware.js'; // middleware de auth

const router = Router();

// GET /search?q=nome   (rota protegida)
router.get(
  '/search',
  verifyToken,
  [query('q').trim().escape()],
  async (req, res) => {
    // validação de querystring
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { q } = req.query;

      // busca case‑insensitive no Postgres
      const players = await Player.findAll({
        where: { name: { [Op.iLike]: `%${q}%` } }
      });

      res.json(players);
    } catch (err) {
      console.error('Erro em /search:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

export default router;
