const express = require('express');
const { getHomepage, getCategory, getProducts, postCategory, getAddSubCategory, postAddSubCategory, deleteCategory, updateCategory } = require('../controller/homeController');

const router = express.Router();

router.get('/', getHomepage)
router.get('/category', getCategory);
router.post('/category', postCategory)
router.post('/category/delete/:ProductCategoryID', deleteCategory)
router.post('/category/update/:ProductCategoryID', updateCategory)
router.get('/product', getProducts)
router.get('/subcategory', getAddSubCategory)
router.post('/subcategory', postAddSubCategory)
module.exports = router;