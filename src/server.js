import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import serverConfig from './config.js';
import viewsRouter from './routes/views.routes.js';
import model from './model/model.js';
import mainRouter from './routes/main.routes.js';
const { PORT, viewsPath, publicPath} = serverConfig;

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
app.use(model);


app.use('/api', mainRouter);
app.use(viewsRouter);

app.listen(PORT, 'localhost', ()=>console.log(`Server is running on port ${PORT}`));