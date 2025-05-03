import { tokenServise } from "../lib/jwt/jwt.js";
import { globalError } from "shokhijakhon-error-handler";

export const checkToken = async (req, res) => {
    try{
        const token = req.headers.authorization;
        if(!token) throw new CliesntError('Unauthorized', 401);
        let verifyToken = tokenServise.verifyToken(token);
        if(!(verifyToken.userAgent == req.headers['user-agent'])) throw new CliesntError('Token is invalid', 401);
      
    }
    catch(error){
        globalError(res, error);
    }
}