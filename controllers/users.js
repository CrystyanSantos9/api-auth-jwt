const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT || 'vegeta123'

const list = async ({User}, req, res) => {
    try{
        const listUsers = await User.find({})

        res.send({
            success: true,
            message: listUsers
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

const register = async ({User}, req, res) => {
    const newUser = new User(req.body)
    try{
        await newUser.save()
        res.send({
            success: true,
            message: newUser
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

const session = async ({User}, req, res) => {
    
    try{
        const user = await User.findOne({username: req.body.username })
        //uso o objeto recuperado para testar a funcao interna de checagem de senha
        const isValid = await user.checkPassword(req.body.password)

        if(isValid){

            //crio o token com o payload do usuário 

            const token = jwt.sign({
                user
            }, secret, {expiresIn: '2 days'})

            res.send({
                success: true,
                message: {
                    userId: user._id,
                    token: token
                }
            })

        }else{
            res.send({
                success: false,
                message: 'user credentials is invalid'
            })
        }
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

const update = async ({User}, req, res) => {
    const {username, password } = req.body

    //$push só quando tivermos campos do tipo array

    try{
        await User.updateOne(
            {_id: req.params.id }, 
            { $set: {username: username, password: password}})
        res.send({
            success: true,
            message: 'user updated successfull'
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

const remove = async ({User}, req, res) => {
    try{
        await User.deleteOne({_id: req.params.id})
        res.send({
            success: true,
            message: 'user removed successfull'
        })
    }catch(e){
        res.send({
            success: false,
            message: e.message
        })
    }
}

module.exports = { list, register, update, remove, session }