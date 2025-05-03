import { Model, DataTypes, Sequelize } from 'sequelize';

interface GrupoAttributes {
  id: number;
  nome: string;
  descricao?: string;
  data_criacao?: Date;
  imagem_perfil?:string;
}

interface GrupoCreationAttributes extends Partial<Omit<GrupoAttributes, 'id' | 'descricao' | 'data_criacao'|'imagem_perfil'>> {}

export class Grupo extends Model<GrupoAttributes, GrupoCreationAttributes> implements GrupoAttributes {
  public id!: number;
  public nome!: string;
  public descricao?: string;
  public data_criacao?: Date;
  public imagem_perfil?:string;
  
  static initialize(sequelize: Sequelize) {
    Grupo.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      descricao: { type: DataTypes.TEXT },
      data_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      imagem_perfil:{type:DataTypes.STRING(100)},
    }, {
      sequelize,
      tableName: 'grupo',
      timestamps: false,
    });
  }
}
