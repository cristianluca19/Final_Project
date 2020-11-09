/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class User extends Model {
        static associate(models) {
        // define associations here, e.g.
        this.hasMany(models.Folder, { foreignKey: 'user_id'});
        }
    };

    User.init(
        {
            firstName: { type: DataTypes.STRING, allowNull: false },
            lastName: { type: DataTypes.STRING, allowNull: false },
            profilePicture: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true}},
            role: { type: DataTypes.ENUM, values: ['admin', 'creator', 'selector'], allowNull: false }
        },
        {
            sequelize,
            modelName: 'user'
        }
    );

    return User;
};  