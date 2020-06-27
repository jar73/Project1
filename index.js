import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import {taskRoutes} from './routes/taskRoutes.js';

const app = express();

const router = express.Router();

app.use(bodyParser.json());
app.use(cors());
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
};

app.use(allowCrossDomain);
app.use("/tasks", taskRoutes);
app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));


app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});




//app.use(function (err, req, res, next) {
//        next(err);
//});




const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});