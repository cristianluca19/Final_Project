import Candidate from '../../../models/Candidate.model';
import { Request, Response } from 'express';
import db from '../../../models';


export class Controller {

  async all(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll()
    res.status(200).json(candidates);
  }

}
export default new Controller();
