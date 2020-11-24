import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // define associations here, e.g.
    }
  }

  Comment.init(
    {
      comment: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'comment',
    }
  );
  return Comment;
};
