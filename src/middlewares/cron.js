import cron from 'node-cron';

export default async function cron(req, res, next){
    cron.schedule('0 0 * * *', async () => {
        let data = await req.readFile('control');
        const now = new Date();
        const filteredData = data.filter(item => {
            const changedData = item.split('/')[0].split('.').reverse().join('-');
            const createdAt = new Date(changedData);
            const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
            return diffInDays <= 30;
        });
        req.writeFile('control', filteredData);
        console.log('Eski yozuvlar o‘chirildi (cron ichidan).');
    });
    return next();
}




