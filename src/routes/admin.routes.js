import express from 'express';
import adminController from '../controllers/admin.controller.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminController.LOGIN);

export default adminRouter;