require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes');
const cors = require('./app/middlewares/cors');

// MongoDb
mongoose.connect(process.env.MONGO_URL);

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded(({ extended: true })));
app.use(morgan('dev'));
app.use('/image', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(routes);

app.listen(3001, () => console.log('Server started at http://localhost:3001'));
