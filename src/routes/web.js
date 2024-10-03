const express = require('express');
const { getHomepage, addCustomer, getProduct } = require('../controller/homeController');
const connection = require('../config/database').default;

const router = express.Router();

router.get('/', getHomepage)
router.get('/add', addCustomer);
router.get('/view-product', getProduct)


module.exports = router;