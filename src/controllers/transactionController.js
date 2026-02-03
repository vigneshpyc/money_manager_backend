const Transaction = require("../models/Transaction");

// Add Transaction
exports.addTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
};

// Get All Transactions
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ dateTime: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};
// Update Transaction (within 12 hours)
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const createdTime = new Date(transaction.createdAt);
    const currentTime = new Date();

    const hoursDifference =
      (currentTime - createdTime) / (1000 * 60 * 60);

    if (hoursDifference > 12) {
      return res
        .status(403)
        .json({ message: "Edit not allowed after 12 hours" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Failed to update transaction" });
  }
};
// Filter Transactions
exports.filterTransactions = async (req, res) => {
  try {
    const { category, division, startDate, endDate } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (division) filter.division = division;

    if (startDate && endDate) {
      filter.dateTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(filter).sort({
      dateTime: -1,
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter transactions" });
  }
};

