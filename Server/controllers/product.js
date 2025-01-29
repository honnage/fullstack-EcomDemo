const prisma = require("../config/prisma")

exports.create = async(req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body
        // console.log(title, description, price, quantity, images )
        const product = await prisma.product.create({
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })
        res.send(product)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.list = async (req, res) => {
    try {
        const { count } = req.params
        const products = await prisma.product.findMany({
            take: parseInt(count),
            orderBy: { createdAt: "desc" },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.update = async(req, res) => {
    try {
        res.send('update Product')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.remove = async(req, res) => {
    try {
        res.send(`delete data  success`)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.listby = async(req, res) => {
    try {
        res.send(`list bu product`)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.searchFilters = async(req, res) => {
    try {
        res.send(`search filters product`)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}