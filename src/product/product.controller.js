const express = require("express")
const prisma = require('../db')
const router = express.Router()

const {
    getAllProducts,
    getProductById,
    createProduct,
    editProductById,
    deleteProductById
} = require('../product/product.service')



// Get All Products
router.get('/', async (req, res) => {
    const products = await getAllProducts()
    res.send(products)
})

// Get Product Specified Id
router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id)

        const product = await getProductById(productId)

        res.send(product)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// Adding Products
router.post('/', async (req, res) => {
    try {
        const newProductData = req.body

        const product = await createProduct(newProductData)

        res.send({
            data: product,
            message: "product success created"
        })
    } catch (error) {
        res.status(400).send({
            statusCode: res.statusCode,
            message: error.message 
        })
    }
})

// Delete Products
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id

        await deleteProductById(parseInt(productId))

        res.send("delete product success")
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// Update Products
router.put('/:id', async (req, res) => {
    const productId = req.params.id
    const productData = req.body

    if (!(productData.name && productData.description && productData.price && productData.image)) {
        return res.status(400).send("Some field are missing")
    }

    await editProductById(parseInt(productId), productData)

    res.send({
        statusCode: res.statusCode,
        message: "product success updated"
    })
})

// Patch Product
router.patch('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body

        const product = await editProductById(parseInt(productId), productData)

        res.send({
            data: product,
            message: "edit product success"
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router