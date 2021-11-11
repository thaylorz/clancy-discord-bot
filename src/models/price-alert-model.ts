import { BuildOptions, DataTypes, Model, Optional, Sequelize, UUIDV4 } from 'sequelize';

export interface PriceAlertAttributes {
  id: string;
  interactionId: string;
  memberId: string;
  guildId: string;
  channelId: string;
  alertType: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PriceAlertCreationAttributes extends Optional<PriceAlertAttributes, 'id'> { }

export interface PriceAlertInterface extends Model<PriceAlertAttributes>, PriceAlertAttributes { }

export class PriceAlertModel extends Model<PriceAlertAttributes, PriceAlertCreationAttributes> implements PriceAlertAttributes {
  public id!: string;
  public interactionId!: string;
  public memberId!: string;
  public guildId!: string;
  public channelId!: string;
  public alertType!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export type PriceAlertStatic = typeof Model & {
  new(values?: object, options?: BuildOptions): PriceAlertInterface;
};

export function priceAlertFactory(sequelize: Sequelize): PriceAlertStatic {
  return <PriceAlertStatic>sequelize.define<PriceAlertInterface>('PriceAlert', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    interactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memberId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alertType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'price-alerts',
  });
}
