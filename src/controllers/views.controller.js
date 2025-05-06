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
                const data = await  req.allAdminPageData
                const id = {id:0}
                return res.render('admin', {...data, ...id});
            }
            catch(error){
                return globalError(error, res);
            }
        }
        
        this.SELECTED_EPLOYEE = async function(req, res) {
            try {
                console.log(req.body);
                
                const data = await  req.allAdminPageData
                return res.render('admin', {...data, ...req.body});
                

            } catch (error) {
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