// require('dotenv').config({ path: '../.env' });
const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const solarRoutes = require('./routes/solarRoutes')

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('App is working'));

app.use('/api', [ authRoutes, solarRoutes ]);

app.listen(5003, () => console.log('Server up on port 5000!'))