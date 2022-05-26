
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: ' + add);
  })

const express = require('express')
const app = express()
const os = require('os')

const PORT = process.env.PORT || '3000'
const hostname = os.hostname()

//import routes
const usersRouter = require('./routes/users')
const seriesRouter = require('./routes/series')
const lancamentosRouter = require('./routes/lancamentos')

app.use(express.json())
app.use(express.urlencoded({extended: true})) /*usa qs para parsing do conteudo */

//setting routes
app.use('/series', seriesRouter)
app.use('/auth', usersRouter)
app.use('/lancamentos', lancamentosRouter)

app.listen(PORT, ()=> console.log(`Server ${hostname} listen on port ${PORT}`))