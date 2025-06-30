import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { User } from '../models/User.js';
import { logEvent } from './middleware.js';

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: { error: 'Muitas tentativas de login deste IP. Por favor, tente novamente após 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: 1, 
});

router.post(
  '/login',
  loginLimiter,
  [
    body('email').isEmail().withMessage('Por favor, forneça um email válido.'),
    body('password').notEmpty().withMessage('A senha não pode estar em branco.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      const isMatch = user ? await bcrypt.compare(password, user.password) : false;

      if (!isMatch) {
        logEvent(`FALHA DE LOGIN - Tentativa para o email: ${email} do IP: ${req.ip}`);
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });

    } catch (err) {
      console.error('Erro no servidor durante o login:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

export default router;