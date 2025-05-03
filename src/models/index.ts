import { Sequelize } from 'sequelize';
import { User } from './User.ts';
import { Conversa } from './Conversa.ts';
import { Grupo } from './Grupo.ts';
import { Administrador } from './Administrador.ts';
import { Mensagem } from './Mensagem.ts';
import { UsuarioGrupo } from './UsuarioGrupo.ts';
import { FirebaseToken } from './FirebaseToken.ts';
import { Notificacao } from './Notificação.ts';
import dotenv from 'dotenv'
dotenv.config()
export const sequelize = new Sequelize('web mensagens', process.env.USER, process.env.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

User.initialize(sequelize);
Conversa.initialize(sequelize);
Grupo.initialize(sequelize);
Administrador.initialize(sequelize);
Mensagem.initialize(sequelize);
UsuarioGrupo.initialize(sequelize);
FirebaseToken.initialize(sequelize);
Notificacao.initialize(sequelize);


Conversa.belongsTo(User, { as: 'Usuario1', foreignKey: 'id_usuario_1' });
Conversa.belongsTo(User, { as: 'Usuario2', foreignKey: 'id_usuario_2' });

Mensagem.belongsTo(Conversa, { foreignKey: 'id_conversa' });
Mensagem.belongsTo(User, { as: 'Remetente', foreignKey: 'id_remetente' });
Mensagem.belongsTo(Grupo, { foreignKey: 'id_grupo' });


Administrador.belongsTo(User, { foreignKey: 'id_usuario' });
Administrador.belongsTo(Grupo, { foreignKey: 'id_grupo' });

UsuarioGrupo.belongsTo(User, { foreignKey: 'id_usuario' });
UsuarioGrupo.belongsTo(Grupo, { foreignKey: 'id_grupo' });

FirebaseToken.belongsTo(User, { foreignKey: 'id_usuario' });

Notificacao.belongsTo(User, { foreignKey: 'id_usuario' });
Notificacao.belongsTo(Mensagem, { foreignKey: 'id_mensagem' });

Grupo.hasMany(UsuarioGrupo, { foreignKey: 'id_grupo' }); // <- esta linha está faltando

User.hasMany(Administrador,{foreignKey:'id_usuario'})
export {
  User,
  Conversa,
  Grupo,
  Administrador,
  Mensagem,
  UsuarioGrupo,
  FirebaseToken,
  Notificacao,
};
