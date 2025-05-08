export default function currentTime(req, res, next){
    req.currentTime = () => {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const day = new Date().toDateString();
        return `${date}/${day.slice(0, 3)}/${time}`;        
    };
    return next();
}