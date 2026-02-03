const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  updateTransaction,
  filterTransactions
} = require("../controllers/transactionController");

router.post("/", addTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);
router.get("/filter", filterTransactions);
module.exports = router;
