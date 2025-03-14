const prisma = require("../config/prisma")

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
        const cart  = await prisma.cart.findFirst({
            where: {
                orderById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        // console.log(cart)
        res.send({
            products: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.emptyCart = async (req, res) => {
    try {
    const cart = await prisma.cart.findFirst({
        where: { orderById: Number(req.user.id) }
    });
    
    if (!cart) {
        return res.status(400).json({ message: "No cart" });
    }

    await prisma.productOnCart.deleteMany({
        where: { cartId: cart.id },
    });

    const result = await prisma.cart.deleteMany({
        where: { orderById: Number(req.user.id) },
     });
  
    res.json({
        message: "Cart Empty Success",
        deletedCount: result.count,
    });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
};
  
exports.saveAddress = async(req, res) => {
    try{
        const { address } = req.body
        console.log(address)
        const addresssUser = await prisma.user.update({
          where: {
            id: Number(req.user.id),
          },
          data: {
            address: address,
          },
        });
    
        res.json({ ok: true, message: "Address update success" });    

    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.saveOrder = async(req, res) => {
    try{
        const userCart = await prisma.cart.findFirst({
            where: {
                orderById: Number(req.user.id)
            },
            include: {
                products: true
            }
        })

        // check Cart empty
        if (!userCart || userCart.products.length === 0){
            return res.status(400).json({
                ok: false,
                message: 'Cart is Empty'
            })
        }

        // check quantity
        for(const item of userCart.products){
            // console.log('-', item)
            const product = await prisma.product.findUnique({
                where: { id: item.productId  },
                select: { quantity: true, title: true}
            })

            console.log(item, product)
            if (!product || item.count > product.quantity) {
                return res.status(400).json({
                    ok: false,
                    message: `Product "${product?.title || 'Unknown'}" is not available in sufficient quantity`
                });
            }
        }

        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                orderBy: {
                    connect: { id: req.user.id }
                },
                cartTotal: userCart.cartTotal
            }
        })
        // console.log(order)

        // Update Product
        const update = userCart.products.map((item) => ({
            where: { id: item.productId },
            data: {
                quantity: { decrement: item.count },
                sold: { increment: item.count },
            },
        }));
        console.log(update);
        await Promise.all(update.map((updated) => prisma.product.update(updated)));

        await prisma.cart.deleteMany({
            where: {  orderById: Number(req.user.id) }
        })
        res.json({ok: true, order})

    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getOrder = async(req, res) => {
    try{
        const orders = await prisma.order.findMany({
            where: { orderById: Number(req.user.id)},
            include: { 
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        console.log(orders)
        if (orders.length === 0){
            return res.status(400).json({ ok: true, message: 'No Orders' })
        }

        res.send('Hello getOrder')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}