
const jwt = require('jsonwebtoken')

//usado para assinar token
const secret = "vegeta123"

//simula banco de dados
const USERS = {
    'crystyan':'abc123'
}

const auth = (req, res)=> {
    const { user, pass } = req.body

    //Verifica usuario no banco 
    if(USERS[user] && USERS[user] === pass){
        //se sucesso gero meu payload no meu token 
        const token = jwt.sign({
            user
        }, secret, {expiresIn: '2 days'})

        //encerro minha chamada
        return res.send({
            success: true, 
            token /*token vai assinado com informações do user da sessão */
        })
    }
    
    //se der errado
    res.send({
        success: false,
        message: 'wrong credentials'
    })
}


module.exports = {
    auth
}