var { connection } = require('../config/database')
const sql = require("mssql");

const getHomepage = (req, res) => {
  res.send("Welcome to my project")
}
const addCategory = (req, res) => {
  res.render('add.ejs')
}

const postAddCategory = async (req, res) => {
  let { Name, rowguid } = req.body;
  console.log('>>>check Name:', Name, ' rowguid:', rowguid)
  const pool = await connection;
  const data = pool.request()
    .input('Name', sql.NVarChar, Name)
    .input('rowguid', sql.UniqueIdentifier, rowguid)
    .query(
      `INSERT INTO [Production].[ProductCategory]
           ([Name]
           ,[rowguid]
           ,[ModifiedDate])
      VALUES
           (@Name, @rowguid,GETDATE())`)
  res.send('add new category')
}

const getProduct = async (req, res) => {
  try {
    const pool = await connection()
    const data = await pool.request()
      .query(`SELECT top 20 [ProductID]
      ,[Name]
      ,[ProductNumber]
      ,[MakeFlag]
      ,[FinishedGoodsFlag]
      ,[Color]
      ,[SafetyStockLevel]
      ,[ReorderPoint]
      ,[StandardCost]
      ,[ListPrice]
      ,[Size]
      ,[SizeUnitMeasureCode]
      ,[WeightUnitMeasureCode]
      ,[Weight]
      ,[DaysToManufacture]
      ,[ProductLine]
      ,[Class]
      ,[Style]
      ,[ProductSubcategoryID]
      ,[ProductModelID]
      ,[SellStartDate]
      ,[SellEndDate]
      ,[DiscontinuedDate]
      ,[rowguid]
      ,[ModifiedDate]
      FROM [CompanyX].[Production].[Product]`)

    //console.log(data.recordset)
    res.render('listProduct.ejs', { listProducts: data.recordset })
  }
  catch (err) {
    console.error("Error fetching products: ", err);
    res.status(500).send("Error fetching products");
  }
}




module.exports = {
  getHomepage,
  addCategory,
  getProduct,
  postAddCategory
}