import { NextFunction, Request, Response } from 'express';
import db from '../../../models';
import uuid from 'uuidv4';

export class foldersController {
  async all(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.query.uuid) {
      next();
    } else {
      const folders = await db.Folder.findAll();
      res.status(200).json(folders);
    }
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

  async byUuid(req: Request, res: Response): Promise<void> {
    try {
      const folder = await db.Folder.findOne({
        where: { uuid: req.query.uuid },
        attributes: ['id', 'uuid', 'recruiterId', 'opened'],
        include: [
          {
            model: db.Recruiter,
            attributes: ['company', 'contactName', 'email'],
          },
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
            through: { attributes: [] },
          },
        ],
      });
      if (!folder.opened) await folder.update({ opened: true });
      res.status(200).json(folder);
    } catch (error) {
      error.status = 400;
      error.message = 'UUID invalido';
      res.status(error.status).send(error.message);
      throw error;
    }
  }

  async postFolder(req: Request, res: Response): Promise<void> {
    const folder = await db.Folder.create({ uuid });
    res.status(201).json({ folder });
    return;
  }

  // this controller receives association data through query params. No need to pass all the fields, just the ones necesary to update.
  async updateById(req: Request, res: Response): Promise<void> {
    const { recruiterId, userId } = req.query; // add associations
    const folder = await db.Folder.findByPk(req.params.folderId);
    if (recruiterId) await folder.setRecruiter(recruiterId);
    if (userId) await folder.setUser(userId);
    res.status(200).json(folder);
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    await db.Folder.destroy({ where: { id: req.params.folderId } });
    res.sendStatus(204);
  }
}
export default new foldersController();
