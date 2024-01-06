const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

const app = express();

const port = process.env.PORT;

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
