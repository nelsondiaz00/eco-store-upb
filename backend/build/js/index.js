import Client from './client/Client';
import Server from './express/Server';
import Products from './products/Products';
import Users from './user/Users';
const productsView = Products.createView();
const clientView = Client.createView();
const userView = Users.createView();
const server = new Server(productsView, clientView, userView);
server.start();
