import { globalError } from 'shokhijakhon-error-handler'; 
 
class ViewsController {
    constructor(){
        this.GET = async function(req, res){
            try{
                return res.render('index');
            }
            catch(error){
                return globalError(error, res);
            }
        }
        this.ADMIN = async function(req, res, next){
            try{
                return res.render('admin');
            }
            catch(error){
                return globalError(error, res);
            }
        }
        this.LOGIN = async function(req, res, next){
            try{
                return res.render('login');
            }
            catch(error){
                return globalError(error, res);
            }
        }
        this.TAKING_PHOTO = async function(req, res, next){
            try{
                return res.render('takingPhoto');
            }
            catch(error){
                return globalError(error, res);
            }
        }
    }
 }

 export default new ViewsController();