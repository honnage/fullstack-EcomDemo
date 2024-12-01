exports.register = async(req, res) => {
    try {
        res.send('Hellow Register In Controller')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.login = async(req, res) => {
    try {
        res.send('Hellow Login In Controller')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.currentUser = async(req, res) => {
    try {
        res.send('Hellow currentUser In Controller')

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}