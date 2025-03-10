const prisma = require("../config/prisma")
const { use } = require("../routes/user")

exports.listUsers = async (req, res) => {
    try{
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        })
        res.json(users)
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.changeStatus = async(req, res) => {
    try{
        const { id , enabled} = req.body
        const user = await prisma.user.update({
            where: { id: Number(id)},
            data: { enabled: enabled }
        })
        res.send('Update changeStatus Success')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.changeRole = async(req, res) => {
    try{
        const { id , role} = req.body
        const user = await prisma.user.update({
            where: { id: Number(id)},
            data: { role: role }
        })
        res.send('Update Role Success')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.userCart = async(req, res) => {
    try{
        const { cart } = req.body
        console.log(cart)
        console.log(req.user.id)

        const user = await prisma.user.findFirst({
            where: { id: Number(req.user.id)}
        })
        console.log(user)

        // delete old Card item
        await prisma.productOnCart.deleteMany({
            where : {
                cart: {
                    orderById: user.id
                }
            }
        })
        // Delete old Card
        await prisma.cart.deleteMany({
            where: { orderById: user.id }
        })
        // เตรียมข้อมูลสินค้า

        let product = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price
        }))

        // หาผลรวม
        let cartTotal = product.reduce((sum, item) => sum + item.price * item.count, 0)
        console.log(cartTotal)

        // New Card
        const newCart = await prisma.cart.create({
            data: {
                products: {
                    create: product
                },
                cartTotal: cartTotal,
                orderById: user.id
            }
        })
        console.log(newCart)

        res.send('Add Cart ok')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getUserCart = async(req, res) => {
    try{
        res.send('Hello getUserCart')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.emptyCart = async(req, res) => {
    try{
        res.send('Hello emptyCart')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.saveAddress = async(req, res) => {
    try{
        res.send('Hello saveAddress')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.saveOrder = async(req, res) => {
    try{
        res.send('Hello saveOrder')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getOrder = async(req, res) => {
    try{
        res.send('Hello getOrder')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}