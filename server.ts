import express from 'express';
import port from './utils/envConfig';

const app = express();

app.listen(port, () => { console.log(`running at port ${port}`); });