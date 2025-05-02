import express from 'express';
import adminRouter from './admin.routes.js';

const mainRouter = express.Router();

mainRouter.use(adminRouter);

export default mainRouter;