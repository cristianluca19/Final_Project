import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import db from '../../../models';

export class candidatesFilter {
  async filter(req: Request, res: Response): Promise<void> {
    const { skillsArray, cohortArray, locationArray } = req.body;
    const consult = {
      where: {
        cohort: cohortArray,
        country: locationArray,
      },
      include: {
        model: db.Skill,
        where: {
          name: skillsArray,
        },
      },
    };
    try {
      if (!skillsArray.length) delete consult.include;
      if (!cohortArray.length) delete consult.where.cohort;
      if (!locationArray.length) delete consult.where.country;
      const candidatesFiltered = await db.Candidate.findAll(consult);
      if (!candidatesFiltered.length){
        res
          .send(204)
          .send('No se encontraron candidatos que cumplan con lo especificado');
        return;
      }
      res.status(200).json(candidatesFiltered);
      return;
    } catch (err) {
      res.status(400).json(err);
      return;
    }
  }
}
export default new candidatesFilter();
