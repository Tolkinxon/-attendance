import cron from 'node-cron';
import fs from 'node:fs/promises';
import serverConfig from '../config.js';
const { dbPath } = serverConfig;

export default async function cronFunction(){
    cron.schedule('0 0 * * *', async () => {
        let data = await fs.readFile(dbPath('control'), 'utf-8');
        data ? JSON.parse(data):[];

        const now = new Date();
        const filteredData = data.filter(item => {
            const changedData = item.split('/')[0].split('.').reverse().join('-');
            const createdAt = new Date(changedData);
            const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
            return diffInDays <= 30;
        });
        await fs.writeFile(dbPath('control'), JSON.stringify(filteredData, null, 4));
        console.log('Eski yozuvlar o`chirildi');
    });
}




