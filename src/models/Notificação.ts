import { Model, DataTypes, Sequelize } from 'sequelize';

interface NotificacaoAttributes {
  id: number;
  id_usuario: number;
  id_mensagem?: number;
  tipo_mensagem: string;
  lida?: boolean;
  data_criacao?: Date;
}

interface NotificacaoCreationAttributes extends Partial<Omit<NotificacaoAttributes, 'id' | 'id_mensagem' | 'lida' | 'data_criacao'>>{}

export class Notificacao extends Model<NotificacaoAttributes, NotificacaoCreationAttributes> implements NotificacaoAttributes {
  public id!: number;
  public id_usuario!: number;
  public id_mensagem?: number;
  public tipo_mensagem!: string;
  public lida?: boolean;
  public data_criacao?: Date;
  
  static initialize(sequelize: Sequelize) {
    Notificacao.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_usuario: { type: DataTypes.INTEGER, allowNull: false },
      id_mensagem: { type: DataTypes.INTEGER },
      tipo_mensagem: { type: DataTypes.STRING(50), allowNull: false },
      lida: { type: DataTypes.BOOLEAN, defaultValue: false },
      data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      sequelize,
      tableName: 'notificacao',
      timestamps: false,
    });
  }
}
