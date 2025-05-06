const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();
const day = new Date().toDateString();
console.log(`${date}/${day.slice(0, 3)}/${time}`);

