import { Request, Response } from 'express';
import db from '../../../models';

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

  async updateByIdCandidate(req: Request, res: Response): Promise<void> {
    const candidateUpdate = await db.Candidate.update(req.body, {
      where: { id: req.params.candidateId },
    });
    res.status(200).json(candidateUpdate);
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

  async deleteCandidate(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.destroy({
      where: { id: req.params.candidateId },
    });
    res.status(204).end();
  }

  async addCandidate(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const candidate = await db.Candidate.create(body);
    res.status(200).json(candidate);
  }

  async byFilter(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll({
      where: {
        visibility: req.params.visibility,
      },
    });
    res.status(200).json(candidates);
  }
}

export default new CandidatesController();
