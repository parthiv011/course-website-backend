const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const instructorRouter = require('./routes/instructor');

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors({}));

app.get('/', (req, res) => {
  res.json({
    msg: 'Home',
  });
});

app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/instructor' , instructorRouter );

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
