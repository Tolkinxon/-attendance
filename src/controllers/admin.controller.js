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
        this.GET = async function(req, res) {
            try {
                const id = req.params.id;
                const control = await req.readFile('control');
                const employee = await req.readFile('employee');
                const kpp = await req.readFile('kpp');

                const filteredControlData = control.filter(item => item.emp_id == id);
                filteredControlData.map(item => {
                    for(let kppItem of kpp){
                        if(kppItem.id == item.kpp_id) {item.gate_location = kppItem.gate_location; break;}
                    }
                })
                const foundedEmployee = employee.find(item => item.id == id);
                        

          
                res.status(200).json({status:200, message: "User successfully founded", data: {control: filteredControlData, name: foundedEmployee.fname +" "+ foundedEmployee.lname}});

            } catch (error) {
                return globalError(error, res);
            }
        }
        this.GET_EMPLOYEE = async function(req, res) {
            try {
                const id = req.params.id;
                const employee = await req.readFile('employee');
      
                const foundedEmployee = employee.find(item => item.id == id);
          
                res.status(200).json({status:200, message: "User successfully founded", data: foundedEmployee});
            } catch (error) {
                return globalError(error, res);
            }
        }
        this.PUT_EMPLOYEE = async function(req, res) {
            try {
                const id = req.params.id;
                const updatedData = req.body
                updatedData.id = Number(id);
                const employee = await req.readFile('employee');
                const foundedIndexEmployee = employee.findIndex(item => item.id == id);
                employee.splice(foundedIndexEmployee, 1, updatedData);
                const confirmWriteFile = await req.writeFile('employee', employee);
                if(confirmWriteFile) return res.status(200).json({status:200, message: "User successfully updated"});
                else throw new ServerError("Something went wrong!");
            } catch (error) {
                return globalError(error, res);
            }
        }
    }
}

export default new AdminController