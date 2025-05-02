import { ClientError, globalError } from 'shokhijakhon-error-handler';

class AdminController {
    constructor(){
        this.LOGIN = async function(req, res) {
            try {
                const admin = req.body;
                const adminsData = await req.readFile('admin');
                for(let prevAdmin of adminsData){
                    if(admin.name_or_email.includes('@')){
                        if(prevAdmin.email == admin.name_or_email && prevAdmin.password == admin.password) return res.status(200).json({message: "user successfulle logged", status:200, prevAdmin});
                    } else {
                        if(prevAdmin.name == admin.name_or_email && prevAdmin.password == admin.password) return res.status(200).json({message: "user successfulle logged", status:200, prevAdmin});
                    }
                }
                throw new ClientError("Email or password wrong!", 400);
            } catch (error) {
                return globalError(error, res);
            }
        }
    }
}

export default new AdminController