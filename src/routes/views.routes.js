import express from 'express';
import viewsController from '../controllers/views.controller.js';

const viewsRouter = express.Router();

viewsRouter.get('/', viewsController.GET);
viewsRouter.get('/admin', viewsController.ADMIN);
viewsRouter.get('/taking-photo', viewsController.TAKING_PHOTO);

export default viewsRouter;