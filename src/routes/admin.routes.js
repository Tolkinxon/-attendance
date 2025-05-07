import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { loginValidate } from '../utils/validator.js';


const adminRouter = express.Router();

adminRouter.post('/login', loginValidate, adminController.LOGIN);
adminRouter.post('/admin', adminController.CREATE);
adminRouter.get('/admin/:id', adminController.GET);
adminRouter.get('/admin/employee/:id', adminController.GET_EMPLOYEE);

export default adminRouter;