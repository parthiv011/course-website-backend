const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const app = express();

const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'Home',
  });
});

app.use('/admin', adminRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
