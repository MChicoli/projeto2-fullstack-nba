import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/', authRoutes);

(async () => {
  try {
    await sequelize.sync();          // cria tabelas se não existirem
    app.listen(process.env.PORT || 5000, () =>
      console.log(`API rodando na porta ${process.env.PORT || 5000}`)
    );
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  }
})();
