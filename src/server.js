import express from 'express';

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

app.listen(prompt, 'localhost', ()=>console.log(`Server is running on port ${PORT}`));