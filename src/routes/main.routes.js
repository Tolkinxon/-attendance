import express from 'express';
import adminRouter from './admin.routes.js';
import confirmRouter from './confirm.routes.js';

const mainRouter = express.Router();

mainRouter.use(adminRouter);
mainRouter.use(confirmRouter);

export default mainRouter;