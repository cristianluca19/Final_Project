import { Request, Response } from 'express';
import db from '../../../models';
import fs from 'fs';
import { parse } from '@fast-csv/parse';
import { promisify } from 'util';

export class Controller {
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
      const unlinkAsync = promisify(fs.unlink)

      fs.createReadStream(req.file.path)
        .pipe(parse({ headers: true, delimiter: ',' }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', (row) => {
          candidates.push(row);
        })
        .on('end', () => {
          res.status(200).send(candidates);
        });
      await unlinkAsync(req.file.path);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: 'Could not upload the file: ' + req.file.originalname,
      });
    }
  };

  async bulkCreateCandidate(req: Request, res: Response): Promise<void> {
    try {
      const bulkCandidates = await db.Candidate.bulkCreate(req.body);
      res.status(200).json(bulkCandidates);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new Controller();
