import { sequelize } from './config/db.js';
import { User } from './models/User.js';

(async () => {
  try {
    await sequelize.sync();  // garante que a tabela exista

    await User.create({
      email: 'teste@exemplo.com',
      password: '123456'     // será hashado pelo hook do modelo
    });

    console.log('Usuário criado ✔️');
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
  } finally {
    await sequelize.close();
  }
})();
