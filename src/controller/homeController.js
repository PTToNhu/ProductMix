const { getProductsFDB, postProductFDB, deleteProductFDB, updateProductFDB,
  postCategoryFDB, getCategoryFDB, deleteCategoryFDB, updateCategoryFDB,
  postSubCategoryFDB, deleteSubCategoryFDB, getSubCategoryFDB, updateSubcategoryFDB,
  getModelFDB,  getUnitMeasureFDB } = require('../routes/api')

const getHomepage = (req, res) => {
  res.render("home.ejs")
}
const getProducts = async (req, res) => {
  try {
    const data = await getProductsFDB();
    //console.log(data.recordset)
    const subCategories = await getSubCategoryFDB();
    const models = await getModelFDB();
    const unitMeasures = await getUnitMeasureFDB()
    res.render('product.ejs', { listProducts: data.recordset, subCategories: subCategories.recordset, models: models.recordset, unitMeasures: unitMeasures.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
}
const postProduct = async (req, res) => {
  console.log(req.body)
  await postProductFDB(req.body);
  res.redirect('/product')
}
const updateProduct = async (req, res) => {
  await updateProductFDB(req.params.ProductID, req.body)
  console.log(req.params)
  console.log(req.body)
  res.redirect('/product')
}
const deleteProduct = async (req, res) => {
  await deleteProductFDB(req.params.ProductID)
  //console.log(req.params)
  res.redirect('/product')
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
  await postCategoryFDB(Name)
  res.redirect('/category')
}
const deleteCategory = async (req, res) => {
  await deleteSubCategoryFDB(req.params.ProductCategoryID)
  await deleteCategoryFDB(req.params.ProductCategoryID)
  //console.log(req.params)
  res.redirect('/category')
}
const updateCategory = async (req, res) => {
  await updateCategoryFDB(req.params.ProductCategoryID, req.body.Name)
  //console.log(req.params)
  //console.log(req.body)
  res.redirect('/category')
}
const getSubCategory = async (req, res) => {
  try {
    const data = await getCategoryFDB()
    //console.log('>>>category: ', data.recordset)
    const subCategories = await getSubCategoryFDB()
    res.render('subCategory.ejs', { categories: data.recordset, subcategories: subCategories.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
}
const postSubCategory = async (req, res) => {
  let { ProductCategoryID, Name } = req.body;
  console.log('>>>check PId:', ProductCategoryID,'>>>Name:', Name)
  const data = await postSubCategoryFDB(Name, ProductCategoryID)
  res.redirect('/subcategory')
}
const deleteSubcategory = async (req, res) => {
  await deleteSubCategoryFDB(req.params.ProductSubcategoryID)
  // console.log(req.params.ProductSubcategoryID)
  res.redirect('/subcategory')
}
const updateSubcategory = async (req, res) => {
  await updateSubcategoryFDB(req.params.ProductSubcategoryID, req.body.Name, req.body.ProductCategoryID)
  // console.log(req.params)
  // console.log(req.body)
  res.redirect('/subcategory')
}
const getReport = (req, res) => {
  res.render('report.ejs')
}


module.exports = {
  getHomepage,
  getProducts,
  postProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
  getSubCategory,
  postSubCategory,
  deleteSubcategory,
  updateSubcategory,
  getReport
}