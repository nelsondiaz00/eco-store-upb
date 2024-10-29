export default class UserController {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    getUsers = async (_req, res) => {
        const products = await this.userModel.getUsers();
        if (products.length === 0) {
            res.status(200).json([]);
            return;
        }
        res.status(200).json(products);
    };
    getUserById = async (req, res) => {
        const { id } = req.params;
        if (id) {
            const product = await this.userModel.getUserById(id);
            if (product) {
                res.status(200).json(product);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        else {
            res.status(400).json({ message: 'Id is required' });
        }
    };
    createUser = async (req, res) => {
        const user = req.body;
        if (user) {
            await this.userModel.createUser(user);
            res.status(201).json({ message: 'User created' });
        }
        else {
            res.status(400).json({ message: 'User is required' });
        }
    };
}
