import { Router } from 'express';
import ClientController from './app/controllers/ClientController';

const routes = new Router();

routes.post('/cliente', ClientController.store);
routes.get('/cliente?limite={numero}&pagina={numero}', ClientController.index);
routes.get('/cliente/{id}', ClientController.show);
routes.put('/cliente/{id}', ClientController.update);
routes.delete('/cliente/{id}', ClientController.destroy);

export default routes;
