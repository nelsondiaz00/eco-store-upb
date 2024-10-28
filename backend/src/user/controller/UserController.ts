import { Request, Response } from 'express';
import UserModel from '../model/UserModel';

export default class UserController {
  constructor(private readonly userModel: UserModel) {}

  public getUsers = async (_req: Request, res: Response) => {
    const products = await this.userModel.getUsers();
    if (products.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(products);
  };

  public getUserByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    if (email) {
      const product = await this.userModel.getUserByEmail(email);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'Id is required' });
    }
  };

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    if (user) {
      await this.userModel.createUser(user);
      res.status(201).json({ message: 'User created' });
    } else {
      res.status(400).json({ message: 'User is required' });
    }
  };
}
