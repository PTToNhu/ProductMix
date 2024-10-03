const express = require('express');
const { getHomepage, addCategory, getProduct, postAddCategory } = require('../controller/homeController');

const router = express.Router();

router.get('/', getHomepage)
router.get('/add-category', addCategory);
router.post('/add-category', postAddCategory)
router.get('/list-product', getProduct)
module.exports = router;