const allCustomer = (req, res) => {
  res.status(200).json({
    success: true,
    data: "You have reached the all customer",
  });
};

const newCustomer = (req, res) => {
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
      data: `Delete request for customer id is ${ id }`,
    });
  };

module.exports = { allCustomer, newCustomer, findCustomer, updateCustomer, deleteCustomer };
