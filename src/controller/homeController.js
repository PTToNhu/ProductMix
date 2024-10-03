var { config } = require('../config/database')
const sql = require("mssql");

const getHomepage = (req, res) => {
  res.send("Welcome to my project")
}
const addCustomer = (req, res) => {
  res.render('add.ejs')
}

const getProduct = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const data = pool.request().query(`SELECT TOP (10) [ProductID]
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
  FROM [CompanyX].[Production].[Product]
`)
    data.then(res1 => {
      return res.json(res1);
    })
  }
  catch (err){
    console.log(err)
  }
}

module.exports = {
  getHomepage,
  addCustomer,
  getProduct
}