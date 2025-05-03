import { Model, DataTypes, Sequelize } from 'sequelize';

interface MensagemAttributes {
  id: number;
  id_conversa?: number;
  id_remetente: number;
  id_grupo?: number;
  conteudo?: string; // Pode ser null
  arquivo?: string;  // Caminho do arquivo
  data_envio?: Date;
}

interface MensagemCreationAttributes extends Partial<Omit<MensagemAttributes, 'id' | 'id_conversa' | 'id_grupo' | 'conteudo' | 'arquivo' | 'data_envio'>> {}

export class Mensagem extends Model<MensagemAttributes, MensagemCreationAttributes> implements MensagemAttributes {
  public id!: number;
  public id_conversa?: number;
  public id_remetente!: number;
  public id_grupo?: number;
  public conteudo?: string;
  public arquivo?: string;
  public data_envio?: Date;
  
  static initialize(sequelize: Sequelize) {
    Mensagem.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_conversa: { type: DataTypes.INTEGER },
      id_remetente: { type: DataTypes.INTEGER, allowNull: false },
      id_grupo: { type: DataTypes.INTEGER },
      conteudo: { type: DataTypes.TEXT, allowNull: true },
      arquivo: { type: DataTypes.STRING, allowNull: true },
      data_envio: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      sequelize,
      tableName: 'mensagem',
      timestamps: false,
    });
  }
}
