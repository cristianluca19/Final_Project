import { Request, Response } from 'express';
import db from '../../../models';

export class usersController {
  async postUser(req: Request, res: Response): Promise<void> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const profilePicture = req.body.profilePicture;
    const role = req.body.role;
    const user = await db.User.create({
      firstName,
      lastName,
      profilePicture,
      role,
    });
    res.status(200).json({ 'CREATED: ': user });
    return;
  }
}
export default new usersController();
