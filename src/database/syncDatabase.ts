import { sequelize } from '../models/index.ts'; 

export default(async () => {
  try {
    await sequelize.authenticate(); 
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true }); 
    console.log('Tabelas sincronizadas com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar com o banco de dados:', error);
  }
})();
