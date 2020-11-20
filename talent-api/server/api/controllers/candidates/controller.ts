import { Request, Response } from 'express';
import db from '../../../models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import fs from 'fs';
import { parse } from '@fast-csv/parse';

export class CandidatesController {
  async all(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll();
    res.status(200).json(candidates);
  }

  csvToJson = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }
      const candidates = [];

      fs.createReadStream(req.file.path)
        .pipe(parse({ headers: true, delimiter: ',' }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', async (row) => {
          row.status = row.status.toLowerCase();
          row.visibility = row.visibility.toLowerCase();
          const newUser = new db.Candidate(row);
          //const userValidated = await newUser.validate(); //TODO: print more informative error
          candidates.push(newUser);
        })
        .on('end', () => {
          res.status(200).send(candidates);
        });
      fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      return res.status(400).send({
        error: `Validation failed: ${error}`,
      });
    }
  };

  async bulkCreateCandidate(req: Request, res: Response): Promise<void> {
    try {
      const bulkCandidates = await db.Candidate.bulkCreate(req.body);
      console.log('bulk', bulkCandidates)
      res.status(200).json(bulkCandidates);
    } catch (error) {
      console.log(error.message)
      res.status(400).send('An error   has ocurred while creating candidates');
    }
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
    }
  }
}

export default new CandidatesController();
