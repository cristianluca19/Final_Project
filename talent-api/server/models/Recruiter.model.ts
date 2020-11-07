/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Recruiter extends Model {
    static associate(models) {
      // define associations here, e.g.
          //ACA SE DEFINEN LAS ASOCIACIONES, HACERLO CUANDO ESTEN TODOS LOS MODELOS CREADOS

    }
  }

  Recruiter.init(
    {
      contactName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false}, 
      company: { type: DataTypes.STRING, allowNull: false},
      siteUrl: { type: DataTypes.STRING, allowNull: false},
    },
    {
      sequelize,
      modelName: 'recruiter',
    }
  );

  return Recruiter;
};
