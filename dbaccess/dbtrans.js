const userSchema = require("../model/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_TOKEN = process.env.SECRET_TOKEN;

const createUsers = async (req, res) => {
  try {
    const checkExist = await userSchema.findOne({ email: req.body.email });

    if (checkExist) {
      return res.status(201).json({
        success: false,
        error: `error: email ${req.body.email} has already been used`,
      });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await userSchema.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      memtype: req.body.memtype,
    });

    // const newUser = new userSchema({
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashPassword,
    //   memtype: req.body.memtype,
    // });

    // const user = await newUser.save();

    const token = jwt.sign(
      { user_id: newUser._id, email },
      SECRET_TOKEN,
      {
        expiresIn: "2h",
      }
    );

    newUser.token = token;

    res.status(201).json({
      success: true,
      message: `Customer ${newUser.name} created`
    });
  } catch (error) {
    console.log("DB save error. please check inputs.", error);

    res.status(500).json({
      success: false,
      data: error.message,
    });
  }
};

const allCustomer = async (req, res) => {
  try {
    const result = await customer.find();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log("Read all customer error", error.message);

    res.status(500).json({
      success: false,
      data: "Read all customer error",
      error: error.message,
    });
  }
};

const findCustomer = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await customer.findById(id);

    res.status(200).json({
      success: false,
      data: result,
      message: `Customer ${id} found!!!!`,
    });
  } catch (error) {
    console.log(`Find customer error `, error.message);
    res.status(500).json({
      success: false,
      data: `Find customer ${id} error`,
      error: error.message,
    });
  }
};

const updateCustomer = async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await customer.findById(req.params.id);
    result.name = name;
    result.email = email;
    result.save();

    res.status(200).json({
      success: true,
      data: result,
      message: `Customer ${name} updated`,
    });
  } catch (error) {
    console.log("Update Error", error.message);

    res.status(500).json({
      success: false,
      data: req.body,
      error: error.message,
    });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await customer.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      data: result,
      message: `Customer ${id} deleted.`,
    });
  } catch (error) {
    console.log("Deletion error ", error.message);

    res.status(500).json({
      success: false,
      data: `Deletion failed for ${id}`,
      error: error.message,
    });
  }
};

module.exports = {
  allCustomer,
  createUsers,
  findCustomer,
  updateCustomer,
  deleteCustomer,
};
