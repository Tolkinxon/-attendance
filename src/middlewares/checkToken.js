import  {tokenServise}  from "../lib/jwt.js";
const { verifyToken } = tokenServise;
import { globalError } from "shokhijakhon-error-handler";

export const checkToken = async (req, res, next) => {
    try{
        const token = req.headers.authorization;
        if(!token) throw new CliesntError('Unauthorized', 401);
        let verifyTokenValue = verifyToken(token);
        if(!(verifyTokenValue.userAgent == req.headers['user-agent']))  return res.status(400).json({message: "Token is invalid", status:401});
        
        const adminsData = await req.readFile('admin');
        for(let prevAdmin of adminsData){
            if(!(prevAdmin.email == verifyTokenValue.email && prevAdmin.password == verifyTokenValue.password)) return res.status(400).json({message: "Token is invalid", status:401});
        }
        return next();
    }
    catch(error){
       console.log(error);
       globalError(error, res);
       
    }
}