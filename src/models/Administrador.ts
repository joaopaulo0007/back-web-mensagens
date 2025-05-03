import { Model, DataTypes, Sequelize } from 'sequelize';

interface AdministradorAttributes {
  id: number;
  id_grupo: number;
  id_usuario: number;
}

interface AdministradorCreationAttributes extends Partial<Omit<AdministradorAttributes, 'id'>> {}

export class Administrador extends Model<AdministradorAttributes, AdministradorCreationAttributes>
  implements AdministradorAttributes {
  declare id: number;
  declare id_grupo: number;
  declare id_usuario: number;

  static initialize(sequelize: Sequelize) {
    Administrador.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_grupo: { type: DataTypes.INTEGER, allowNull: false },
      id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    }, {
      sequelize,
      tableName: 'administrador',
      timestamps: false,
    });
  }
}
