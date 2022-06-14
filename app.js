const express = require('express');

const ejs = require('ejs'); // dynamic site qilish uchun html faylni oqish uchun

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();

app.set('view engine', 'ejs'); //prayektimda ejs ni kordingmi san uni view deb korishni boshlaysan hommi?

const morgan = require('morgan');

app.use((req, res, next) => {
  if (req.path == '/api/v1/tours/best-3-tours') {
    req.query.limit = 3;
    req.query.sort = '-ratingsAverage';
  }
  next();
});

app.use(express.json()); // Middleware qorovulcha

app.use(morgan('dev'));

app.use((req, res, next) => {
  req.requestDate = new Date();
  next();
});

// App Users routing

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app. bogandan keyin bu midleware boladi

app.all('*', (req, res, next) => {
  // bu midleware eng pastida bolishhi shart chunki hamma routelani tekshirib keyin pastiga tushushi kerak
  // res.status(404).json({
  //   status: 'failed',
  //   message: 'This page is not found',
  // });
  res.render('404'); // ./view/404 deb yozish kerak emas 404 yozsak oshani chunadi
});

module.exports = app;

app.use(express.static(`${__dirname}/public`));
