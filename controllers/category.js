exports.create = async(req, res) => {
    try {
        res.send('Hellow category create')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.list = async(req, res) => {
    try {
        res.send('Hellow category list')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.remove = async(req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        res.send('Hellow category delete')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}