import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import db from '../../../models';

export class candidatesFilter {
  async filter(req: Request, res: Response): Promise<void> {
    const { skillsArray, cohortArray, locationArray } = req.body;
    try {
      console.log('entra?');
      if (!skillsArray.length) {
        const candidatesFiltered = await db.Candidate.findAll({
          where: {
            cohort: cohortArray,
            country: locationArray,
          },
        });
        res.status(200).json(candidatesFiltered);
        return;
      } else if (!cohortArray.length) {
        const candidatesFiltered = await db.Candidate.findAll({
          where: {
            country: locationArray,
          },
          include: {
            model: db.Skill,
            where: {
              name: skillsArray,
            },
          },
        });
        if (!candidatesFiltered.length)
          res.status(204).send('No se han encontrado resultados');
        res.status(200).json(candidatesFiltered);
        return;
      } else if (!locationArray.length) {
        const candidatesFiltered = await db.Candidate.findAll({
          where: {
            cohort: cohortArray,
          },
          include: {
            model: db.Skill,
            where: {
              name: skillsArray,
            },
          },
        });
        if (!candidatesFiltered.length)
          res.status(204).send('No se han encontrado resultados');
        res.status(200).json(candidatesFiltered);
        return;
      } else {
        const candidatesFiltered = await db.Candidate.findAll({
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
        });
        if (!candidatesFiltered.length)
          res.status(204).send('No se han encontrado resultados');
        res.status(200).json(candidatesFiltered);
        return;
      }
    } catch (err) {
      res.status(400).json(err);
      return;
    }
  }
}
export default new candidatesFilter();
