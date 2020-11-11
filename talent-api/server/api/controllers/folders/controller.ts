import { Request, Response } from 'express';
import db from '../../../models';
import uuid from 'uuidv4';

export class Controller {
  async postFolder(req: Request, res: Response): Promise<void> {
    const folder = await db.Folder.create({ uuid });
    res.status(200).json({ folder });
    return;
  }
}
export default new Controller();
