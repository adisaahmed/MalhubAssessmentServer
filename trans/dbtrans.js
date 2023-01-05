const customer = require("../models/customer");

const allCustomer = (req, res) => {
  res.status(200).json({
    success: true,
    data: "You have reached the all customer",
  });
};

const newCustomer = async (req, res) => {
  const { name, email } = req.body;
  const cust = new customer({
    name,
    email,
  });

  try {
    const result = await cust.save();

    res.status(200).json({
      success: true,
      data: result,
      message: `customer ${ name } created`
    });
  } catch (error) {
    console.log("new customer creation error", error.message);

    res.status(401).json({
      success: false,
      data: error.message,
    });
  }

  res.status(200).json({
    success: true,
    data: req.body,
  });
};

const findCustomer = (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    success: true,
    data: `Customer id is ${id}`,
  });
};

const updateCustomer = (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    success: true,
    data: req.body,
    message: `In update function ${id}`,
  });
};

const deleteCustomer = (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    success: true,
    data: `Delete request for customer id is ${id}`,
  });
};

module.exports = {
  allCustomer,
  newCustomer,
  findCustomer,
  updateCustomer,
  deleteCustomer,
};
