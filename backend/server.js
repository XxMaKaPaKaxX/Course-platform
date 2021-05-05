const express = require('express');
const cors = require('cors');


const coursesRoutes = require('./routes/courses');
const usersRoutes = require('./routes/users');

const server = express();

server.use(express.json());

server.use(cors({
    "origin": '*',
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    "optionsSuccessStatus": 200,
    "maxAge": 1000
}));

server.use('/courses', coursesRoutes);
server.use('/users',  usersRoutes);

server.listen(8000, () => console.log('Server for course is started...'));
