var { connection } = require('../config/database')
const sql = require("mssql");
const { getProductsFDB, postCategoryFDB, getCategoryFDB, postSubCategoryFDB, deleteCategoryFDB, updateCategoryFDB, deleteSubCategoryFDB, getSubCategoryFDB, getModelFDB } = require('../routes/api')

const getHomepage = (req, res) => {
  res.render("home.ejs")
}
const getCategory = async (req, res) => {
  try {
    const data = await getCategoryFDB();
    //console.log(data.recordset)
    res.render('category.ejs', { categories: data.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching categories");
  }
}
const postCategory = async (req, res) => {
  let Name = req.body.Name;
  //console.log('>>>check Name:', Name)
  const data = await postCategoryFDB(Name)
  res.redirect('/category')
}
const getProducts = async (req, res) => {
  try {
    const data = await getProductsFDB();
    //console.log(data.recordset)
    const subCategories=await getSubCategoryFDB();
    const models=await getModelFDB();
    res.render('product.ejs', { listProducts: data.recordset, subCategories: subCategories.recordset, models: models.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
}
const getSubCategory = async (req, res) => {
  try {
    const data = await getCategoryFDB()
    //console.log('>>>category: ', data.recordset)
    const subCategories = await getSubCategoryFDB()
    res.render('subCategory.ejs', { listCategories: data.recordset, subCategories: subCategories.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
}
const postSubCategory = async (req, res) => {
  let { ProductCategoryID, Name } = req.body;
  //console.log('>>>check PId:', ProductCategoryID,'>>>Name:', Name)
  const data = await postSubCategoryFDB(Name, ProductCategoryID)
  res.redirect('/subcategory')
}
const deleteCategory = async (req, res) => {
  await deleteSubCategoryFDB(req.params.ProductCategoryID)
  await deleteCategoryFDB(req.params.ProductCategoryID)
  //console.log(req.params)
  res.redirect('/category')
}
const updateCategory = async (req, res) => {
  await updateCategoryFDB(req.params.ProductCategoryID, 'Name')
  console.log(req.params)
  res.redirect('/category')
}


module.exports = {
  getHomepage,
  getProducts,
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
  getSubCategory,
  postSubCategory

}