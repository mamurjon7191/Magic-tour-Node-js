const Tour = require('../model/tourModel.js');

const getToursAll = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours,
    },
  });
};
const addTour = async (req, res) => {
  // assinxron funcsiya ishlatdikmmi try,catchni ishlatamiz
  try {
    // malumotni databasega yozish

    // const tourModel = new Tour(req.body);
    // const data = await tourModel.save();
    // console.log(data);

    //2-usul
    const data = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      message: 'Invalid data',
    });
  }
};

const getTourItem = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      data,
    },
  });
};

const updateTour = (req, res) => {};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: 'Malumot uchirildi',
  });
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
