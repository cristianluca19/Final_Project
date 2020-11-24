import { Request, Response } from 'express';
import db from '../../../models';

export class CommentsController {
  async all(req: Request, res: Response): Promise<void> {
    const comments = await db.Comment.findAll();
    res.status(200).json(comments);
  }

  async byId(req: Request, res: Response): Promise<void> {
    const comment = await db.Comment.findByPk(req.params.commentId);
    res.status(200).json(comment);
  }

  async add(req: Request, res: Response): Promise<void> {
    const { comment } = req.body;
    const { recruiterId, folderId, userId } = req.query;
    const response = await db.Comment.create({
      comment: comment,
      recruiterId: recruiterId,
      folderId: folderId,
      userId: userId,
    });
    res.status(200).json(response);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    await db.Comment.update(req.body, {
      where: { id: req.params.commentId },
    });
    res.sendStatus(200);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.commentId);
    await db.Comment.destroy({ where: { id } });
    res.sendStatus(204);
  }
}

export default new CommentsController();
