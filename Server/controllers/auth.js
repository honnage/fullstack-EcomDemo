const prisma = require('../config/prisma') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req, res) => {
    try {
        const {email, password} = req.body

        // Validate body
        if (!email){
            return res.status(400).json({message: 'Email is required!!!'})
        }
        if (!password){
            return res.status(400).json({message: 'Password is required!!!'})
        }

        // Check Email in DB already?
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })

        if (user){
            return res.status(400).json({message: "Email already exits!!"})
        }

        // Hash Password
        const hashPassword = await bcrypt.hash(password, 10)
        // console.log(email, user, password, hashPassword)

        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })
        res.send('Register Seccess')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.login = async(req, res) => {
    try {
        const {email, password} = req.body
        console.log(email, password)

        // Check Email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user || !user.enabled){
            return res.status(400).json({message: "User not found or not enabled"})
        }

        // Check Password
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!isMatchPassword){
            return res.status(400).json({message: "Password invalid!!!"})
        }

        // Create Payload and Generate Token
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        // const secretKey = process.env.SECRET_KEY || 'systeam_password';
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" })
            }
            res.status(200).json({ payload, token })
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.currentUser = async(req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        })
        res.json({user})

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}