const express = require('express');
const router = express.Router();
const { createLostItem, getAllItems, reportLostItem } = require('../controllers/lostItemController');

// POST /api/lost-items
router.post('/lost-items', createLostItem);
// GET /api/lost-items
router.get('/lost-items', getAllItems);
// POST /api/report
router.post('/report', reportLostItem);

module.exports = router;
