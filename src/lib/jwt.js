import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import serverConfig from '../config.js';
const { TOKEN_KEY } = serverConfig;


export const tokenServise = {
    createToken: (payload) => sign(payload, TOKEN_KEY, {expiresIn: '1d'}),
    verifyToken: (token) => verify(token, TOKEN_KEY)
}

