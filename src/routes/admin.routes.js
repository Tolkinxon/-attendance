import express from 'express';
import adminController from '../controllers/admin.controller.js';
import { employeeValidate, loginValidate } from '../utils/validator.js';
import { checkToken } from '../middlewares/checkToken.js';


const adminRouter = express.Router();

adminRouter.post('/login', loginValidate, adminController.LOGIN);
adminRouter.get('/admin/:id',checkToken, adminController.GET);
adminRouter.post('/admin/employee',employeeValidate, adminController.CREATE);
adminRouter.get('/admin/employee/:id',checkToken, adminController.GET_EMPLOYEE);
adminRouter.put('/admin/employee/:id', adminController.PUT_EMPLOYEE);
adminRouter.delete('/admin/employee/:id', adminController.DELETE_EMPLOYEE);
adminRouter.post('/admin/employee/check-id', adminController.CHECK_ID);

export default adminRouter;