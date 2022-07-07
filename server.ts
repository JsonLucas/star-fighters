import express, { json } from 'express';
import dbConnectionMiddlware from './middlewares/dbConnectionMiddleware';
import router from './routes';
import { port } from './utils/envConfig';

const app = express();
app.use(json());
app.use(dbConnectionMiddlware);
app.use(router);

app.listen(port, () => { console.log(`running at port ${port}`); });