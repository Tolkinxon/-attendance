import { ClientError, globalError } from 'shokhijakhon-error-handler';
import { tokenServise } from '../lib/jwt.js';
const { createToken } = tokenServise;

class AdminController {
    constructor(){
        this.LOGIN = async function(req, res) {
            try {
                
                const admin = req.body;
                const adminsData = await req.readFile('admin');
                for(let prevAdmin of adminsData){
                    if(prevAdmin.email == admin.email && prevAdmin.password == admin.password) return res.status(200).json({message: "user successfulle logged", status:200, accessToken: createToken({...prevAdmin, userAgent: req.headers['user-agent']})});
                }
                throw new ClientError("Email or password wrong!", 400);
            } catch (error) {
                return globalError(error, res);
            }
        }
        this.CREATE = async function(req, res) {
            try {
                const employee = req.body;
                const employeesData = await req.readFile('employee');
                
                if(employeesData.some(item => item.email == employee.email)) throw new ClientError('This user already excist!', 4000);

                const newEmployee = {id: employeesData ? employeesData.at(-1).id + 1:1, ...employee}
                employeesData.push(newEmployee);
                await req.writeFile('employee', employeesData);
                res.status(200).json({message: "User successfully added", status: 200});

            } catch (error) {
                return globalError(error, res);
            }
        }
    }
}

export default new AdminController