import {Router} from 'express';
import NinjaController from './controllers/NinjaController';

const routes = Router();

routes.get("/ninjas", NinjaController.index)
routes.get("/ninjas-list", NinjaController.show)
routes.post("/ninjas", NinjaController.create)
routes.put("/ninjas/:id", NinjaController.update)
routes.delete("/ninjas/:id", NinjaController.delete)

export default routes;