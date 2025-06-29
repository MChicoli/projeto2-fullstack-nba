import { Router } from 'express';
import { Player } from '../models/Player.js';
import { verifyToken } from './middleware.js';

const router = Router();

router.delete('/player/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Player.destroy({ where: { id } });
    if (deleted) {
      res.json({ msg: 'Jogador removido com sucesso' });
    } else {
      res.status(404).json({ error: 'Jogador não encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao remover jogador' });
  }
});

export default router;
