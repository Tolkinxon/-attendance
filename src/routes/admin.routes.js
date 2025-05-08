import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { loginValidate } from '../utils/validator.js';


const adminRouter = express.Router();

adminRouter.post('/login', loginValidate, adminController.LOGIN);
adminRouter.get('/admin/:id', adminController.GET);
adminRouter.post('/admin/employee', adminController.CREATE);
adminRouter.get('/admin/employee/:id', adminController.GET_EMPLOYEE);
adminRouter.put('/admin/employee/:id', adminController.PUT_EMPLOYEE);
adminRouter.delete('/admin/employee/:id', adminController.DELETE_EMPLOYEE);

export default adminRouter;