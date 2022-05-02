const express = require('express');

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();
const morgan = require('morgan');

app.use(express.json()); // Middleware qorovulcha

app.use(morgan('common'));

app.use((req, res, next) => {
  req.requestDate = new Date();
  next();
});
// App Users routing

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 8000;
app.listen(port, '127.0.0.1');
