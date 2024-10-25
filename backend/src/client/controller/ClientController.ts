import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export default class ClientController {
  public index = (req: Request, res: Response): void => {
    const { module } = req.params;
    const filePath = path.resolve(__dirname, '../public/index.html');

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error leyendo el archivo:', err);
        res.status(500).send('Error del servidor');
        return;
      }

      let pageValue = '';
      switch (module) {
        case 'login':
          pageValue = module;
          break;
        case 'products':
          pageValue = module;
          break;
        default:
          pageValue = 'default';
      }
      const modifiedData = data.replace(
        /(meta name="path" page=")[^"]*(")/,
        `$1${pageValue}$2`
      );

      res.status(200).send(modifiedData);
    });
  };
}
