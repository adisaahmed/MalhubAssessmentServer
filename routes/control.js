const express = require("express");
const router = express.Router();
const { allCustomer, newCustomer, findCustomer, updateCustomer, deleteCustomer } = require("../trans/dbtrans");


router.get("/all", allCustomer);
router.get("/customer/:id", findCustomer);
router.post("/newcustomer", newCustomer);
router.put("/updatecustomer/:id", updateCustomer);
router.delete("/deletecustomer/:id", deleteCustomer);

module.exports = router;
