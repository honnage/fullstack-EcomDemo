exports.register = async(req, res) => {
    try {
        const {email, password} = req.body
        console.log(email, password)
        // Validate body
        if (!email){
            return res.status(400).json({message: 'Email is required!!!'})
        }
        if (!password){
            return res.status(400).json({message: 'Password is required!!!'})
        }


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