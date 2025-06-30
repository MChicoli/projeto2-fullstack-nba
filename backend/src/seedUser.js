// src/seedUser.js - VERSÃO FINAL CORRETA
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import { User } from './models/User.js';

dotenv.config();

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error('ERRO: ADMIN_EMAIL e ADMIN_PASSWORD devem ser definidos no arquivo .env');
  process.exit(1);
}

(async () => {
  try {
    await sequelize.sync();
    
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { password } // Passa a senha em texto puro aqui
    });

    if (created) {
      console.log(`Usuário admin criado com sucesso: ${email}`);
    } else {
      // Se o usuário já existe, atualizamos a senha dele
      user.password = password; // Passa a senha em texto puro aqui também
      await user.save();
      console.log(`Senha do usuário admin (${email}) foi atualizada com sucesso.`);
    }

  } catch (err) {
    console.error('Erro no script seed:', err);
  } finally {
    await sequelize.close();
  }
})();