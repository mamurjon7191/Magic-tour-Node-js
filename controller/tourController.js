const Tour = require('../model/tourModel.js');

const getToursAll = async (req, res) => {
  try {
    const query = { ...req.query };
    console.log(req.query);
    const removeQuery = ['sort', 'page', 'limit', 'field'];
    removeQuery.forEach((val) => delete query[val]);
    const queryStr = JSON.stringify(query)
      .replace(/\bgt\b/g, '$gt')
      .replace(/\blt\b/g, '$lt')
      .replace(/\bgte\b/g, '$gte')
      .replace(/\blte\b/g, '$lte');
    ////////////////////////////////////
    ////////////////////////////////////
    // console.log(queryStr);

    let data = Tour.find(JSON.parse(queryStr));
    if (req.query.sort) {
      const querySort = req.query.sort.split(',').join(' ');
      console.log(querySort);
      data = data.sort(querySort);
    }
    const queryData = await data;
    if (queryData.length) {
      res.status(200).json({
        status: 'Success',
        results: queryData.length,
        data: {
          queryData,
        },
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: 'invalid data',
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
/////////////////////////////////////////

module.exports = {
  getToursAll,
  addTour,
  updateTour,
  deleteTour,
  getTourItem,
};
