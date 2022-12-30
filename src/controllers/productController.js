const productModel = require('../model/productModel');

//------------------------------------------- PRODUCT APIS -----------------------------------------------//

//--------------------[1]-CREATE PRODUCT----------------------//

const addProduct = async function (req, res) {
    try {
        let data = req.body.data //data 
        let Data = JSON.parse(data) // convert Data Into 

        // MongoDb call For store Data
        let savedData = await productModel.create(Data)

        res.status(201).send({ status: true, data: savedData })

    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}

//-------------------[2]-GET PRODUCTS DATA--------------------//

const getProductsByQuery = async function (req, res) {
    try {
        let query = req.query
        let { productName, Description, Quantity, UnitPrice } = query

        let data = await productModel.find(query)

        if (data.length == 0) {
            return res.status(404).send({ status: false, msg: "Products Data Not Found!" })
        }

        res.status(200).send({ status: false, data: data })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

module.exports = { addProduct, getProductsByQuery }