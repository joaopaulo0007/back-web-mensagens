import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  foto_perfil?: string;
  telefone?: string;
}

interface UserCreationAttributes extends Partial<Omit<UserAttributes, 'id' | 'foto_perfil' | 'telefone'>> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public foto_perfil?: string;
  public telefone?: string;
  
  static initialize(sequelize: Sequelize) {
    User.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(100), allowNull: false },
      foto_perfil: { type: DataTypes.STRING(100) },
      telefone: { type: DataTypes.STRING(20) },
    }, {
      sequelize,
      tableName: 'user',
      timestamps: false,
    });
  }
}
