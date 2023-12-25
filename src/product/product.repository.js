const prisma = require("../db");

const findProducts = async () => {
    const product = await prisma.product.findMany()

    return product
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    return product
}

const insertProduct = async (productData) => {
    const { name, description, price, image } = productData;

    const product = await prisma.product.create({
        data: {
            name,
            description,
            price,
            image,
        }
    })

    return product
}

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id
        },
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image,
        }
    })

    return product
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
            id
        }
    })
}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    editProduct,
    deleteProduct
}