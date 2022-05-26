const jwt = require('jsonwebtoken')

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

module.exports = { needsAuth }