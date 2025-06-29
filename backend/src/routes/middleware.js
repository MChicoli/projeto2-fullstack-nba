import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'activity.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

/**
 *Função central que escreve uma mensagem formatada no arquivo de log.
 * @param {string} message
 */

export function logEvent(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  logStream.write(logMessage);
  console.log(logMessage.trim());
}

export function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    logEvent(`ACESSO NEGADO (Sem Token) - Rota: ${req.method} ${req.originalUrl}`);
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    logEvent(`ACESSO NEGADO (Token Inválido) - IP: ${req.ip}`);
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

export function logActivity(req, res, next) {
  const userId = req.userId;
  let logDetail = `UserID: ${userId} acessou ${req.method} ${req.originalUrl}`;
  
  if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
    if (req.path.includes('/bulk')) {
       logDetail += ` com múltiplos registros.`;
    } else {
       logDetail += ` com body: ${JSON.stringify(req.body)}`;
    }
  }

  logEvent(logDetail);
  next();
}