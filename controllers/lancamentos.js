
const axios = require('axios')
const jwt = require('jsonwebtoken')

//usado para assinar token
const secret = "vegeta123"



const list = async (req, res)=> {

    //pegando usuário da verificacao do token feito em routes authNeeds 
    const user = res.locals.user 

    try{

        const lancamentos = await axios({
            url: 'https://dog.ceo/api/breeds/list/all',
            method: 'get',
            data: {
                foo: 'bar'
            }
        })
    
    
      return res.send({
            user: user,
            success: true,
            data: lancamentos.data
        })

    }catch(e){
        return res.send({
            success: false,
            // error: Object.keys(e)
            error: e.message
        })
    }
}


module.exports = {
    list,
}