import { Model, DataTypes, Sequelize } from 'sequelize';

interface ConversaAttributes {
  id: number;
  id_usuario_1: number;
  id_usuario_2: number;
  data_criacao?: Date;
  data_ultima_mensagem?: Date;
}

interface ConversaCreationAttributes extends Partial<Omit<ConversaAttributes, 'id' | 'data_criacao' | 'data_ultima_mensagem'>> {}

export class Conversa extends Model<ConversaAttributes, ConversaCreationAttributes> implements ConversaAttributes {
  public id!: number;
  public id_usuario_1!: number;
  public id_usuario_2!: number;
  public data_criacao?: Date;
  public data_ultima_mensagem?: Date;
  
  static initialize(sequelize: Sequelize) {
    Conversa.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_usuario_1: { type: DataTypes.INTEGER, allowNull: false },
      id_usuario_2: { type: DataTypes.INTEGER, allowNull: false },
      data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      data_ultima_mensagem: { type: DataTypes.DATE },
    }, {
      sequelize,
      tableName: 'conversa',
      timestamps: false,
    });
  }
}
