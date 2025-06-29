import dotenv from 'dotenv';
import crypto from 'crypto';
import { sequelize } from './config/db.js';
import { User } from './models/User.js';

dotenv.config();

const email = process.env.ADMIN_EMAIL || 'admin@example.com';
let password = process.env.ADMIN_PASSWORD;

if (!password) {
  password = crypto.randomBytes(4).toString('hex');
  console.log(`Senha gerada aleatoriamente: ${password}`);
}

(async () => {
  try {
    await sequelize.sync();
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { password }
    });

if (created) {
  console.log(`Usuário admin criado: ${email}`);
} else {
  await user.update({ password });
  console.log(`Senha atualizada para o usuário: ${email}`);
}
  } catch (err) {
    console.error('Erro no seed:', err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
})();
