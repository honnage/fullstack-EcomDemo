const prisma = require("../config/prisma")

exports.create = async(req, res) => {
    try {
        res.send('Hellow create Product')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.list = async(req, res) => {
    try {
        res.send('List Product')

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