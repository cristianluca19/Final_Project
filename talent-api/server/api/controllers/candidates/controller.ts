import { Request, Response } from 'express';
import db from '../../../models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export class CandidatesController {
  async all(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll();
    res.status(200).json(candidates);
  }

  async byId(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findByPk(req.params.candidateId);
    res.status(200).json(candidate);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findByPk(req.params.candidateId);
    candidate.visibility = req.body.visibility;
    await candidate.save();
    res.status(200).json(candidate);
  }

  async addToFolder(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findByPk(req.params.candidateId);
    const folder = await db.Folder.findByPk(req.params.folderId);
    const reply = await folder.addCandidate(candidate);
    res.status(200).json(reply);
  }

  async deleteFromFolder(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findByPk(req.params.candidateId);
    const folder = await db.Folder.findByPk(req.params.folderId);
    const reply = await folder.removeCandidate(candidate);
    res.status(200).json(reply);
  }

  async byFilter(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll({
      where: {
        visibility: req.params.visibility,
      },
    });
    res.status(200).json(candidates);
  }

  async searchByProp(req: Request, res: Response): Promise<void> {
    const { search } = req.query;
    try {
      const candidates = await db.Candidate.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.iLike]: '%' + search + '%',
              },
            },
            {
              lastName: {
                [Op.iLike]: '%' + search + '%',
              },
            },
            {
              email: {
                [Op.iLike]: '%' + search + '%',
              },
            },
          ],
        },
      });
      res.status(200).json(candidates);
    } catch (err) {
      res.status(404).send(err.message);
      throw err;
    }
  }
}
export default new CandidatesController();
