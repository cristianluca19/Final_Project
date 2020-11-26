import { Request, Response } from 'express';
import db from '../../../models';

export class CommentsController {
  async byFolderId(req: Request, res: Response): Promise<void> {
    const comments = await db.Comment.findAll({
      where: {
        folderId: req.params.folderId
      }
    });
    res.status(200).json(comments);
  }

  async add(req: Request, res: Response): Promise<void> {
    const { content } = req.body;
    const { folderId, userId } = req.params;
    const { recruiterId } = req.query;
    const response = await db.Comment.create({
      content: content,
      recruiterId: recruiterId,
      folderId: folderId,
      userId: userId,
    });
    res.status(200).json(response);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    const response = await db.Comment.update(req.body, {
      where: { id: req.params.commentId },
    });
    res.status(200).json(response);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.commentId);
    await db.Comment.destroy({ where: { id } });
    res.sendStatus(204);
  }
}

export default new CommentsController();
