import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import routerGrupo from '../routes/grupoRoutes.ts';
import routerConversa from '../routes/conversaRoutes.ts';
import routerUser from '../routes/userRouter.ts';
import routerAdm from '../routes/administradorRouter.ts';
import routerFirebase from '../routes/firebaseRouter.ts';
import routerMensagem from '../routes/mensagemRouter.ts';
import routerNotificacao from '../routes/notificacaoRouter.ts';
import routerUsuarioGrupo from '../routes/usuarioGrupoControler.ts';
import type { Express } from 'express';
export default function configApp(app: Express) {
  // Middlewares globais
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads')); // Para servir arquivos estáticos

  // Rotas
  app.use( routerUser);
  app.use(routerGrupo);
  app.use( routerConversa);
  app.use( routerAdm);
  app.use( routerFirebase);
  app.use( routerMensagem);
  app.use(routerNotificacao);
  app.use(routerUsuarioGrupo);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
  });
}
