// backend/src/server.js
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { sequelize } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js'; 
import insertRoutes from './routes/insertRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());                           //body parser
app.use(cors());                                   //CORS livre
app.use(helmet());                                 //cabeçalhos de segurança
app.use(compression());                            //gzip responses
app.use(morgan('dev'));                            //logs HTTP
app.use(rateLimit({                                //limiter simples
  windowMs: 15 * 60 * 1000, 
  max: 100
}));


app.use('/', authRoutes);     
app.use('/', searchRoutes);   
app.use('/', insertRoutes);


app.get('/health', (_, res) => res.send('OK'));


const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () =>
      console.log(`API rodando na porta ${PORT}`)
    );
  } catch (err) {
    console.error('Erro ao conectar no banco:', err);
  }
})();
