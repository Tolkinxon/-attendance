import express from 'express';
import viewsController from '../controllers/views.controller.js';
import allAdminPageData from '../middlewares/allAdminPageData.js';

const viewsRouter = express.Router();

viewsRouter.get('/', viewsController.GET);
viewsRouter.get('/admin', allAdminPageData, viewsController.ADMIN);
viewsRouter.post('/admin', allAdminPageData, viewsController.SELECTED_EPLOYEE);
viewsRouter.get('/login', viewsController.LOGIN);
viewsRouter.get('/taking-photo/:id', viewsController.TAKING_PHOTO);


export default viewsRouter;