import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import serverConfig from './config.js';
import viewsRouter from './routes/views.routes.js';
import model from './model/model.js';
import mainRouter from './routes/main.routes.js';
import currentTime from './middlewares/currentTime.js';
import cron from './middlewares/cron.js';
const { PORT, viewsPath, publicPath, uploadsPath} = serverConfig;

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.frameguard());
app.set('view engine', 'ejs');
app.set('views', viewsPath());
app.use(express.static(publicPath()));
app.use(express.static(uploadsPath()));
app.use(model);
app.use(currentTime);
app.use(cron);


app.use('/api', mainRouter);
app.use(viewsRouter);

app.listen(PORT, 'localhost', ()=>console.log(`Server is running on port ${PORT}`));