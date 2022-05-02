const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, {
    encoding: 'utf-8',
  })
);

const getToursAll = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      requested: req.requestDate,
      tours,
    },
  });
};
const addTour = (req, res) => {
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const completeObj = Object.assign({ id: newId }, data);

  tours.push(completeObj);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: completeObj,
        },
      });
    }
  );
};

const getTourItem = (req, res) => {
  const id = +req.params.id;
  const data = tours.find((val) => val.id === id);

  if (data) {
    res.status(200).json({
      status: 'success',
      timeReq: req.time,
      timeRes: res.time,
      data: {
        data,
      },
    });
  }
  // if (req.params.id > tours.length) {
  //   res.status(404).json({
  //     status: 'Failed',
  //     data: 'Invalid Id entered',
  //   });
  // }
};

const updateTour = (req, res) => {
  const id = +req.params.id;
  const data = tours.find((val) => val.id === id);
};

const deleteTour = (req, res) => {
  // if (req.params.id > tours.length) {
  //   res.status(404).json({
  //     status: 'Failed',
  //     data: 'Invalid Id entered',
  //   });
  // }
  const id = +req.params.id;
  const arr = tours.filter((val) => val.id != id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(arr),
    'utf-8',
    (err) => {
      res.status(204).json({
        status: 'success',
        data: 'Malumot uchirildi',
      });
    }
  );
};

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

const checkId = function (req, res, next, val) {
  console.log(`Tour ID is : ${val}`);
  if (val > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      data: 'Invalid Id entered',
    });
  }
  next();
};

module.exports = {
  getToursAll,
  addTour,
  updateTour,
  deleteTour,
  getTourItem,
  checkId,
};
