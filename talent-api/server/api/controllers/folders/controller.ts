import { NextFunction, Request, Response } from 'express';
import db from '../../../models';
import uuid from 'uuidv4';

export class foldersController {
  async all(req: Request, res: Response): Promise<void> {
    const folders = await db.Folder.findAll({
      include: [
        {
          model: db.User,
        },
        {
          model: db.Recruiter,
        },
        {
          model: db.Candidate,
        },
        {
          model: db.Comment,
        },
      ],
    });
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
            'cohortId',
            'profilePicture',
            'visibility',
            'status',
            'miniBio',
            'linkedin',
            'github',
          ],
          through: { attributes: [] }, // This avoids eager loading of intermediate table useless createdAt/updatedAt data. Shows a cleaner API response.
          include: {
            model: db.Skill,
            attributes: ['id', 'name', 'type'],
            through: { attributes: [] },
          },
        },
      ],
    });
    res.status(200).json(folder);
  }

  async byUuid(req: Request, res: Response): Promise<void> {
    try {
      const folder = await db.Folder.findOne({
        where: { uuid: req.params.uuid },
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
              'cohortId',
              'profilePicture',
              'visibility',
              'status',
              'miniBio',
              'linkedin',
              'github',
            ],
            through: { attributes: [] },
            include: {
              model: db.Skill,
              attributes: ['id', 'name', 'type'],
              through: { attributes: [] },
            },
          },
        ],
      });
      if (!folder.opened) folder.update({ opened: true });
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
    const { sentAt } = req.body;
    const folder = await db.Folder.findByPk(req.params.folderId);
    if (recruiterId) await folder.setRecruiter(recruiterId);
    if (userId) await folder.setUser(userId);
    if (sentAt) await folder.update({ sentAt: sentAt });
    res.status(200).json(folder);
  }

  async updateStatusById(req: Request, res: Response): Promise<void> {
    const { status } = req.body;
    await db.Folder.update(
      { status: status },
      { where: { id: req.params.folderId } }
    );
    const folder = await db.Folder.findByPk(req.params.folderId);
    res.status(200).json(folder);
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    await db.Folder.destroy({ where: { id: req.params.folderId } });
    res.sendStatus(204);
  }
}
export default new foldersController();
