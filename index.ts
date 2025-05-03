import express from 'express';
import configApp from './src/config/index.ts';
import './src/database/syncDatabase.ts'; // Isso já executa a sincronização

const app = express();
const PORT = process.env.PORT || 8080;

configApp(app);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
