import express from 'express';
import confirmController from '../controllers/confirm.controller.js';
const confirmRouter = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null,'src/uploads');
    },
    filename: async function(req, file, cb){
        let filename = file.originalname;
        filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + filename;
        cb(null, filename);
        req.imageUrl = filename;
    }  
})
const upload = multer({storage});

confirmRouter.get('/gates', confirmController.GET_GATES);
confirmRouter.post('/confirm', confirmController.CONFIRM);
confirmRouter.post('/upload/:id',upload.single('file'), confirmController.UPLOAD)


export default confirmRouter;