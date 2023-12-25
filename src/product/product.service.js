const {
    findProductById,
    findProducts,
    insertProduct,
    deleteProduct,
    editProduct
} = require("./product.repository")

const getAllProducts = async () => {
    const products = findProducts()

    return products
}

const getProductById = async (id) => {

    const product = await findProductById(id)

    if (!product) {
        throw Error("product not found")
    }

    return product
}

const createProduct = async (newProductData) => {
    const product = await insertProduct(newProductData)

    return product
}

const deleteProductById = async (id) => {
    await getProductById(id)

    await deleteProduct(id)
}

const editProductById = async (id, productData) => {
    await getProductById(id)

    const product = editProduct(id, productData)

    return product
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    editProductById,
    deleteProductById
}