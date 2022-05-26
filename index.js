
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
  })

const express = require('express')
const app = express()
const os = require('os')
const mongoose = require('mongoose')
const User = require('./models/users')

// //para testar bcryp
// const bcrypt = require('bcrypt')
// bcrypt.genSalt((err, salt)=> {
//   console.log(salt)
//   //gerando senha diferente a cada inicializacao por conta do hash
//   bcrypt.hash('senha', salt, (err, hash)=>{
//     console.log(hash)
//   })
// })


const PORT = process.env.PORT || '3000'
const hostname = os.hostname()
const mongoString = 'mongodb://localhost:27017/users'

//import routes
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const seriesRouter = require('./routes/series')
const lancamentosRouter = require('./routes/lancamentos')

app.use(express.json())
app.use(express.urlencoded({extended: true})) /*usa qs para parsing do conteudo */

//setting routes
app.use('/users', usersRouter)
app.use('/series', seriesRouter)
app.use('/auth', authRouter)
app.use('/lancamentos', lancamentosRouter)

const createInitialUser = async()=>{
  const total = await User.count({username: 'root'})

  if(total===0){
    //cria usuário inicial root
    const userRoot = new User({
       username: 'root',
       password: 'root'
    })
    await userRoot.save(()=> console.log('root user created successfull'))
    console.log('user root created')
  }
}

mongoose
  .connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    const state = Number(mongoose.connection.readyState)
    if(!state === 1){
      console.log('db erros with connection')
    }else{
    createInitialUser()
    console.log('db connected succesfull')  
    app.listen(PORT, ()=> console.log(`Server ${hostname} listen on port ${PORT}`))
    }
  })
  .catch(e=>{
    console.log(e)
  })

