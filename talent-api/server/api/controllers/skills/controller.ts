import { Request, Response } from 'express';
import db from '../../../models';

export class SkillsController {
  async all(req: Request, res: Response): Promise<void> {
    try {
      const skills = await db.Skill.findAll({ attributes: ['id', 'name'] });
      res.status(200).json(skills);
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  async byId(req: Request, res: Response): Promise<void> {
    try {
      const { skillId } = req.params;
      const skill = await db.Skill.findByPk(skillId);
      res.status(200).json({
        id: skill.id,
        name: skill.name,
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const newSkill = await db.Skill.create({ name });
      await newSkill.save();
      res.status(200).send({ name: newSkill.name });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { skillId } = req.params;
      await db.Skill.destroy({ where: { id: skillId } });
      res.status(200).send('Skill deleted');
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { skillId } = req.params;
      const { name } = req.body;
      const skill = await db.Skill.findByPk(skillId);
      skill.name = name;
      await skill.save();
      res.status(200).json({
        id: skill.id,
        name: skill.name,
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  }
}
export default new SkillsController();
