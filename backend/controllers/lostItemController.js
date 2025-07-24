const LostItem = require('../models/LostItem');

exports.createLostItem = async (req, res) => {
  try {
    const newItem = new LostItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const items = await LostItem.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reportLostItem = (req, res) => {
  res.status(200).json({ message: "Lost item reported successfully!" });
};
