var { connection } = require('../config/database')
const sql = require("mssql");
const { getProductsFDB, postCategoryFDB, getCategoryFDB, postSubCategoryFDB } = require('../routes/api')

const getHomepage = (req, res) => {
  res.render("home.ejs")
}
const getAddCategory = (req, res) => {
  res.render('category.ejs')
}
const postAddCategory = async (req, res) => {
  let Name = req.body.Name;
  //console.log('>>>check Name:', Name)
  const data = await postCategoryFDB(Name)
  res.send('add new category')
}
const getProducts = async (req, res) => {
  try {
    const data = await getProductsFDB();
    //console.log(data.recordset)
    res.render('product.ejs', { listProducts: data.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
}
const getAddSubCategory = async (req, res) => {
  try {
    const data = await getCategoryFDB()
    //console.log('>>>category: ', data.recordset)
    res.render('subCategory.ejs', { listCategories: data.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
}
const postAddSubCategory = async (req, res) => {
  let { ProductCategoryID, Name } = req.body;
  //console.log('>>>check PId:', ProductCategoryID,'>>>Name:', Name)
  const data = await postSubCategoryFDB(Name, ProductCategoryID)
  res.send('add new subcategory')
}


module.exports = {
  getHomepage,
  getAddCategory,
  getProducts,
  postAddCategory,
  getAddSubCategory,
  postAddSubCategory
}