const Tour = require('../model/tourModel.js');
const ApiFeatures = require('../helper/APIFeatures.js');

// const getThreeBestTour = async (req, res) => {};

const getToursAll = async (req, res) => {
  try {
    const numberOfDocuments = await Tour.countDocuments();

    const apiBolasi = new ApiFeatures(req.query, Tour).filter().sort().field();
    // .pagination(numberOfDocuments);

    const data = await apiBolasi.sorovniYegish;

    /////////////////////_-|_{='_'=}_|-_//////////////////////

    if (data.length) {
      res.status(200).json({
        status: 'Success',
        results: data.length,
        data: {
          data,
        },
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const addTour = async (req, res) => {
  // assinxron funcsiya ishlatdikmmi try,catchni ishlatamiz
  try {
    // malumotni databasega yozish
    //1-usul
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
const getTourItem = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await Tour.findById(req.body.id);
    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  } catch {
    res.status(404).json({
      message: 'Invalid data id',
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: data,
    });
  } catch {
    res.status(404).json({
      status: 'Failed',
      message: 'Updated Error',
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const data = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: data,
    });
  } catch {
    res.status(404).json({
      status: 'Failed',
      message: 'Updated Error',
    });
  }
};

/////////////////////////////////////////
/////////////////////////////////////////
const stats = async (req, res) => {
  try {
    const data = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.7 } } }, // match filterga oxshab ketadi
      {
        $group: {
          id: {},
          averagePrice: { $Avg: '$price' },
        },
      },
    ]);
    res.status(200).json({
      status: 'sucess',
      data: data,
    });
  } catch (err) {
    res.stats(fail).json({
      message: err,
    });
  }
};

/////////////////////////////////////////

module.exports = {
  getToursAll,
  addTour,
  updateTour,
  deleteTour,
  getTourItem,
  stats,
};
