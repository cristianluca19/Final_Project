import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import db from '../../../models';

export class candidatesFilter {
  async filter(req: Request, res: Response): Promise<void> {
    // const { skillsArray, cohortArray, locationArray } = req.body;
    const skills = req.query.skills || '';
    const cohorts = req.query.cohorts || '';
    const location = req.query.locations || '';
    let skillsArray, cohortArray, locationArray;
    skills ? (skillsArray = skills.toString().split(',')) : (skillsArray = []);
    cohorts
      ? (cohortArray = cohorts.toString().split(','))
      : (cohortArray = []);
    location
      ? (locationArray = location.toString().split(','))
      : (locationArray = []);
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
      if (!skillsArray.length && !cohortArray.length && !locationArray.length) {
        res.sendStatus(204);
        return;
      }

      const candidatesFiltered = await db.Candidate.findAll(consult);
      res.status(200).json(candidatesFiltered);
      return;
    } catch (err) {
      res.sendStatus(400);
      return;
    }
  }
}
export default new candidatesFilter();
