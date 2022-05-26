const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()




router.get('/', (req, res)=>{
    // console.log(req.headers) /*uso para chegar o que o usuário envia nos headers */
    /*lá no postman vou enviar o header Autorization com o valor de Bearear com meu token gerado em auth*/

    //validando o token válido
    if(req.headers && req.headers.authorization){
        const header = req.headers.authorization
        const headerParts = header.split(' ') //divide pelo 'espaço' entre Bearer e o valor do token 
        //com o array criado em headerParts = ['Bearer', 'valor token'] pegamos só o valor de token
        //logo o secret está na posicao [1] - precisamos da nossa secret também
        const secret = "vegeta123"
        console.log(headerParts[1])
        try{
            jwt.verify(headerParts[1], secret)
            return res.send('bem vindo')
        }catch(e){}
    }

    res.send({
        error: 'wrong token'
    })

    
})


module.exports = router