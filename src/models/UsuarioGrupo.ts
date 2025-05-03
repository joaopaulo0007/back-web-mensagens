import { Model, DataTypes, Sequelize } from 'sequelize';

interface UsuarioGrupoAttributes {
  id: number;
  id_usuario: number;
  id_grupo: number;
  data_entrada?: Date;
}

interface UsuarioGrupoCreationAttributes extends Partial<Omit<UsuarioGrupoAttributes, 'id' | 'data_entrada'>> {}

export class UsuarioGrupo extends Model<UsuarioGrupoAttributes, UsuarioGrupoCreationAttributes> implements UsuarioGrupoAttributes {
  declare id: number;
  declare id_usuario: number;
  declare id_grupo: number;
  declare data_entrada: Date;
  
  static initialize(sequelize: Sequelize) {
    UsuarioGrupo.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_usuario: { type: DataTypes.INTEGER, allowNull: false },
      id_grupo: { type: DataTypes.INTEGER, allowNull: false },
      data_entrada: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
      sequelize,
      tableName: 'usuario_grupo',
      timestamps: false,
    });
  }
}
