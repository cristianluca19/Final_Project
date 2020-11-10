import { Request, Response } from 'express';
import db from '../../../models';

export class Controller {
  async all(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll();
    res.status(200).json(candidates);
  }
  async byId(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findOne({
      where: {
        email: req.body.email,
      },
    });
    res.status(200).json(candidate);
  }
}
export default new Controller();
