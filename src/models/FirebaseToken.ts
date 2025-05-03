import { Model, DataTypes, Sequelize } from 'sequelize';

interface FirebaseTokenAttributes {
  id: number;
  id_usuario: number;
  token: string;
}

interface FirebaseTokenCreationAttributes extends Partial<Omit<FirebaseTokenAttributes, 'id'>> {}

export class FirebaseToken extends Model<FirebaseTokenAttributes, FirebaseTokenCreationAttributes> implements FirebaseTokenAttributes {
  public id!: number;
  public id_usuario!: number;
  public token!: string;
  
  static initialize(sequelize: Sequelize) {
    FirebaseToken.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      id_usuario: { type: DataTypes.INTEGER, allowNull: false },
      token: { type: DataTypes.STRING(255), allowNull: false },
    }, {
      sequelize,
      tableName: 'firebase_token',
      timestamps: false,
    });
  }
}
