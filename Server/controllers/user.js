exports.listUsers = async(req, res) => {
    try{
        res.send('Hello users')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.changeStatus = async(req, res) => {
    try{
        res.send('Hello changeStatus')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.changeRole = async(req, res) => {
    try{
        res.send('Hello changeRole')
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Server Error'})
    }
}

exports.userCart = async(req, res) => {
    try{
        res.send('Hello userCart')
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