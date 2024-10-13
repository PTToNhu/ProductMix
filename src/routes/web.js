const express = require('express');
const { getHomepage, getAddCategory, getProducts, postAddCategory, getAddSubCategory, postAddSubCategory } = require('../controller/homeController');

const router = express.Router();

router.get('/', getHomepage)
router.get('/category', getAddCategory);
router.post('/category', postAddCategory)
router.get('/product', getProducts)
router.get('/subcategory', getAddSubCategory)
router.post('/subcategory', postAddSubCategory)
module.exports = router;