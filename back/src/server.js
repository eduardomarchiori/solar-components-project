const express = require('express');
var cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const solarRoutes = require('./routes/solarRoutes');
const userRoutes = require('./routes/userRoutes');
const db =require('./infrastructure/db-orm/db');

app.use(cors());
app.use(bodyParser.json());

(async () => {
  const users = require('./infrastructure/db-orm/users');
  const logisticsDimensions = require('./infrastructure/db-orm/logisticsDimensions');
  const solarComponents = require('./infrastructure/db-orm/solarComponents');
  await db.sync();
})();

app.get('/', (req, res) => res.send('App is working'));

app.use('/api', [ authRoutes, solarRoutes, userRoutes ]);

app.listen(5003, () => console.log('Server up on port 5000!'));