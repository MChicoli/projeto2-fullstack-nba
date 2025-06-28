import { Router } from 'express';
import { query, validationResult } from 'express-validator';
import { Player } from '../models/Player.js';
import { verifyToken } from './middleware.js';  // vamos criar isso depois

const router = Router();

router.get('/search', 
  verifyToken,
  [query('q').trim().escape()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { q } = req.query;
    const players = await Player.findAll({
      where: { name: { [Op.iLike]: `%${q}%` } }  // PostgreSQL → busca ignorando maiúsculas
    });

    res.json(players);
  }
);

export default router;
