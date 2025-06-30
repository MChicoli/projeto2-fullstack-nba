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
import playerRoutes from './routes/playerRoutes.js';

dotenv.config();

const app = express();

//Middlewares
app.use(express.json());       
app.use(cors());               
app.use(helmet());         
app.use(compression());      
app.use(morgan('dev'));    

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  trustProxy: 1,
});
app.use(globalLimiter);

app.enable('trust proxy');
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

app.use('/', authRoutes);     
app.use('/', searchRoutes);   
app.use('/', insertRoutes);
app.use('/', playerRoutes);

app.get('/health', (_, res) => res.send('OK'));

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    await sequelize.sync();

    app.listen(PORT, () =>
      console.log(`API rodando na porta ${PORT}`)
    );
  } catch (err) {
    console.error('Erro ao conectar ou sincronizar com o banco de dados:', err);
  }
})();