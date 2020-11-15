import { Request, Response } from 'express';
import db from '../../../models';
import uuid from 'uuidv4';

export class foldersController {
  async all(req: Request, res: Response): Promise<void> {
    const folders = await db.Folder.findAll();
    res.status(200).json(folders);
  }
  async byId(req: Request, res: Response): Promise<void> {
    const folder = await db.Folder.findByPk(req.params.folderId, {
      include: [
        {
          model: db.Candidate,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'country',
            'cohort',
            'profilePicture',
            'visibility',
            'status',
            'miniBio',
            'linkedin',
            'github',
          ],
          through: { attributes: [] }, // This avoids eager loading of intermediate table useless createdAt/updatedAt data. Shows a cleaner API response.
        },
      ],
    });
    res.status(200).json(folder);
  }
  async postFolder(req: Request, res: Response): Promise<void> {
    const folder = await db.Folder.create({ uuid });
    res.status(201).json({ folder });
    return;
  }
  async updateById(req: Request, res: Response): Promise<void> {
    const folder = await db.Folder.update(req.body, {
      where: { id: req.params.folderId },
    });
    res.sendStatus(200);
  }
  async deleteById(req: Request, res: Response): Promise<void> {
    await db.Folder.destroy({ where: { id: req.params.folderId } });
    res.sendStatus(204);
  }
}
export default new foldersController();
