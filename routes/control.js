const express = require("express");
const router = express.Router();
const {
  createUsers,
  allCustomer,
  findCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../dbaccess/dbtrans");

router.post("/adduser", createUsers);
router.get("/all", allCustomer);
router.get("/customer/:id", findCustomer);

router.put("/updatecustomer/:id", updateCustomer);
router.delete("/deletecustomer/:id", deleteCustomer);

module.exports = router;
