import { Request, Response } from 'express';
import db from '../../../models';

export class Controller {
  async postFolder(req: Request, res: Response): Promise<void> {
    console.log('Entra a la ruta')
    const { folderUuid } = req.params;
    // const folderUserId = req.params.folderUserId;
    // const folderRecruiterId = req.params.folderRecruiterId;
    // const folderUuid = req.body.folderUuid;
    // const folderUserId = req.body.folderUserId;
    // const folderRecruiterId = req.body.folderRecruiterId;

    if (folderUuid ) {
      db.Folder.create({
        uuid: folderUuid,
      });

      console.log('OK llego ');
      res.status(200).json({ created: 'Folder created' });
      return;
    } else {
      console.log('Error ');
      res.send(400).send('Error ');
      return;
    }
  }
}
export default new Controller();
