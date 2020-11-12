import { Request, Response } from 'express';
import { NumberDataType } from 'sequelize/types';
import db from '../../../models';
// import l from '../../../common/logger';

export class RecruitersController {
  async all(req: Request, res: Response): Promise<void> {
    const recruiters = await db.Recruiter.findAll();
    res.status(200).json(recruiters);
  }

  async byId(req: Request, res: Response): Promise<void> {
    const recruiter = await db.Recruiter.findByPk(req.params.recruiterId);
    res.status(200).json(recruiter);
  }

  async add(req: Request, res: Response): Promise<void> {
    const newRecruiter = await db.Recruiter.create(req.body);
    res.status(201).json(newRecruiter);
  }

  async delete(req: Request, res: Response): Promise<void> {
    // CONSIDER CHANGING THIS FUNCTIONALITY IN THE FUTURE IF PARANOID MODE IS SETTED OFF IN SEQUELIZE
    const id: number = parseInt(req.params.recruiterId);
    await db.Recruiter.destroy({ where: { id } });
    res.sendStatus(204);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    // TODO
    res.sendStatus(204);
  }
}

export default new RecruitersController();
