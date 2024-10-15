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
        .query(`SELECT [ProductCategoryID],[Name],[rowguid],[ModifiedDate] FROM [Production].[ProductCategory]`)
    return data;
}
const deleteCategoryFDB = async (ProductCategoryID) => {
    const pool = await connection();
    const data = await pool.request()
        .input('ProductCategoryID', sql.Int, ProductCategoryID)
        .query(`DELETE FROM [Production].[ProductCategory]
      WHERE [ProductCategoryID]=@ProductCategoryID`)
}
const updateCategoryFDB = async (ProductCategoryID, Name) => {
    const pool = await connection();
    const data = await pool.request()
        .input('ProductCategoryID', sql.Int, ProductCategoryID)
        .input('Name', sql.NVarChar, Name)
        .query(`UPDATE [Production].[ProductCategory]
                SET [Name] = @Name
                WHERE ProductCategoryID=@ProductCategoryID`)
}
const getSubCategoryFDB = async () => {
    const pool = await connection()
    const data = await pool.request()
        .query(`SELECT CompanyX.Production.ProductSubcategory.ProductSubcategoryID
, CompanyX.Production.ProductSubcategory.ProductCategoryID
, CompanyX.Production.ProductSubcategory.Name
,CompanyX.Production.ProductSubcategory.rowguid
, CompanyX.Production.ProductSubcategory.ModifiedDate
, Production.ProductCategory.Name AS ProductCategoryName
FROM CompanyX.Production.ProductSubcategory
JOIN CompanyX.Production.ProductCategory
ON CompanyX.Production.ProductSubcategory.ProductCategoryID=CompanyX.Production.ProductCategory.ProductCategoryID`)
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
const deleteSubCategoryFDB = async (ProductCategoryID) => {
    const pool = await connection();
    const data = await pool.request()
        .input('ProductCategoryID', sql.Int, ProductCategoryID)
        .query(`DELETE FROM [Production].[ProductSubcategory]
      WHERE ProductCategoryID=@ProductCategoryID`)
}
const getModelFDB = async () => {
    const pool = await connection()
    const data = await pool.request()
        .query(`SELECT [ProductModelID]
      ,[Name]
      ,[CatalogDescription]
      ,[Instructions]
      ,[rowguid]
      ,[ModifiedDate]
  FROM [CompanyX].[Production].[ProductModel]`)
    return data;
}

module.exports = {
    getProductsFDB,

    getCategoryFDB,
    postCategoryFDB,
    updateCategoryFDB,
    deleteCategoryFDB,

    getSubCategoryFDB,
    postSubCategoryFDB,
    deleteSubCategoryFDB,

    getModelFDB

}