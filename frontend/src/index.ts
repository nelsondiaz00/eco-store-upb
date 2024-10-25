import IndexController from "./index/controller/index-controller.js";
import IndexModel from "./index/model/index-model.js";
import IndexView from "./index/view/index-view.js";

// Código inicial para index.ts 
const indexModel = new IndexModel();
const indexView = new IndexView();
const rentalMovies = new IndexController(indexModel, indexView);

rentalMovies.init();
