// const date = new Date().toLocaleDateString();
// const time = new Date().toLocaleTimeString();
// const day = new Date().toDateString();
// console.log(`${date}/${day.slice(0, 3)}/${time}`);

// console.log( Date.now() + '-' + Math.round(Math.random() * 1E9));

    const now = new Date();
    const changedData = '05.04.2025'.split('.').reverse().join('-');
    const createdAt = new Date(changedData);
    const diffInDays = (now - createdAt) / (1000 * 60 * 60 * 24);
    // return diffInDays <= 30;

