import fs from 'node:fs/promises';
import serverConfig from '../config.js';
const { dbPath } = serverConfig;

export default async function model(req, res, next){
    req.readFile = async function(fileName) {
       let data = await fs.readFile(dbPath(fileName), 'utf-8');
       return data ? JSON.parse(data):[];
    }
    req.writeFile = async function(fileName, data) {
        await fs.writeFile(dbPath(fileName), JSON.stringify(data, null, 4));
        return true
     }
    return next();
}