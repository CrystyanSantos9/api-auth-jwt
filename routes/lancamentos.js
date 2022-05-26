const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()
const lancamentosController = require('../controllers/lancamentos')


// //criando middleware que funciona para todas as rotas - 1 forma
// router.use((req, res, next) => {
//     console.log(req.headers)
//     next()
// })

//outra forma de fazer middleware
const needsAuth = ( req, res, next) => {
      //validando o token válido
      if(req.headers && req.headers.authorization){
        const header = req.headers.authorization
        const headerParts = header.split(' ') //divide pelo 'espaço' entre Bearer e o valor do token 
        //com o array criado em headerParts = ['Bearer', 'valor token'] pegamos só o valor de token
        //logo o secret está na posicao [1] - precisamos da nossa secret também
        const secret = "vegeta123"
        console.log(headerParts[1])
        try{
            // //primeira forma 
            // jwt.verify(headerParts[1], secret)
            // return next() //deixa passar então

            //caso a rota de destino precise saber quem mandou a requisição
            //usaremos a informação de user salva em payload
            const payload = jwt.verify(headerParts[1], secret)
            //enviamos para todas as rotas saberem quem fez a req
            console.log(payload)
            res.locals.user = payload.user //vamos pegar essa informação lá no controller /lancamentos
            return next()
        }catch(e){}
    }
    res.send({
        error: 'wrong token'
    })
}

router.use(needsAuth) //aplico em todas

//aplico só em algumas rotas
// router.get('/', needsAuth, lancamentosController.list)

router.get('/', lancamentosController.list)


module.exports = router