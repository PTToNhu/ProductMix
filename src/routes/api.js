var { connection } = require('../config/database')
const sql = require("mssql");

const getProductsFDB = async () => {
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
    return data;
}
const postCategoryFDB = async (Name) => {
    const pool = await connection();
    const data = await pool.request()
        .input('Name', sql.NVarChar, Name)
        .query(
            `INSERT INTO [Production].[ProductCategory]
           ([Name],[rowguid],[ModifiedDate])
      VALUES
           (@Name, NEWID(),GETDATE())`)
}
const getCategoryFDB = async () => {
    const pool = await connection()
    const data = await pool.request()
        .query(`SELECT [ProductCategoryID],[Name] FROM [Production].[ProductCategory]`)
    return data;
}
const postSubCategoryFDB = async (Name, ProductCategoryID) => {
    const pool = await connection();
    const data = await pool.request()
        .input('ProductCategoryID', sql.INT, ProductCategoryID)
        .input('Name', sql.NVarChar, Name)
        .query(
            `INSERT INTO [Production].[ProductSubcategory]
           ([ProductCategoryID],[Name],[rowguid],[ModifiedDate])
      VALUES
           (@ProductCategoryID,@Name, NEWID(),GETDATE())`)
}

module.exports = {
    getProductsFDB,
    postCategoryFDB,
    getCategoryFDB,
    postSubCategoryFDB
}