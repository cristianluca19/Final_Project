/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import sequelize from 'sequelize';
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Skills extends Model {
        static associate(models) {
            // define associations here, e.g.
            this.belongsToMany(models.Candidate, {
                through: 'candidates_skills',
            });
        }
    }


    Skills.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            type: { type: DataTypes.ENUM('hard', 'soft') }
        },
        {
            sequelize,
            modelName: 'skills'
        }
    )
    return Skills
}