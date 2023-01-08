const customer = require("../models/customer");

const allCustomer = async (req, res) => {

try {
  const result = await customer.find();
  res.status(200).json({
    success: true,
    data: result
  });

} catch (error) {
  console.log( 'Read all customer error', error.message )

  res.status(500).json({
    success: false,
    data: "Read all customer error",
    error: error.message
  });

}
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
};

const findCustomer = (req, res) => {
  const id = req.params.id;

  res.status(200).json({
    success: true,
    data: `Customer id is ${id}`,
  });
};

const updateCustomer = async (req, res) => {
  const id = req.params.id;

  try {
    
  } catch (error) {
    console.log('Update Error', error.message)

    res.status(500).json({
      success: false,
      data: req.body,
      message: `In update function ${id}`,
    });
  }
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
