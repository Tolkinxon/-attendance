import { ClientError, globalError } from 'shokhijakhon-error-handler';


class ConfirmController {
    constructor(){
        this.GET_GATES= async function(req, res) {
            try {
                const kpp = await req.readFile('kpp');
                res.status(200).json({status:200, message: "All gates successfully founded", data: kpp});
            } catch (error) {
                return globalError(error, res);
            }
        }
        this.CONFIRM = async function(req, res) {
            try {
                const employee = req.body;
                const employeesData = await req.readFile('employee');
                const foundedEmployee = employeesData.find(item => item.user_id == employee.user_id);
                console.log(foundedEmployee);
                
                if(foundedEmployee == undefined) return res.status(400).json({message: "This id is not excist", status: 400});
                
                const controlsData = await req.readFile('control');
                const filteredControl = controlsData.filter(controlItem => controlItem.emp_id == foundedEmployee.id);

                const control = {
                    time: req.currentTime(),
                    kpp_id: Number(employee.kpp_id),
                    emp_id: foundedEmployee.id,
                    direction: filteredControl?.at(-1)?.direction == 'in' ? 'out':'in',
                }
                const newControl = {id: controlsData ? controlsData?.at(-1).id + 1:1, ...control}

                controlsData.push(newControl);
                const isWrite = await req.writeFile('control', controlsData);
                if(isWrite) return res.status(200).json({message: "Action successfully added", status: 200, condition: newControl.direction, userName: foundedEmployee.fname + ' ' + foundedEmployee.lname, imgId: newControl.id});
                throw new ServerError('Something went wrong!');
            } catch (error) {
                return globalError(error, res);
            }
        }
        this.UPLOAD = async function(req, res) {
            try {
                const id = req.params.id;
                console.log(req.imageUrl, id);
                const control = await req.readFile('control');
                const controlIndex = control.findIndex(item => item.id == id);
                if(controlIndex == -1) throw new ClientError("Error width control id!", 400);

                control[controlIndex].imagePath = `/${req.imageUrl}`;

                const confirmWriteFile = await req.writeFile('control', control);
                if(confirmWriteFile) return res.status(200).json({status:200, message: "Image successfully uploaded"});
                else throw new ServerError("Something went wrong!");
            } catch (error) {
                return globalError(error, res);
            }
        }
    }
}

export default new ConfirmController