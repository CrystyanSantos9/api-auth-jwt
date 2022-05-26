const { default: mongoose } = require("mongoose")
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


//utilizando middleware pre save do moongose 

UserSchema.pre('save', function(next) {
    let user = this //selecionando objeto instanciado 

    console.log("passa na funcao de save")

    //se o usuário não modificou o campo senha - ele passa direto - next()
    if (!user.isModified('password')) return next()

    //se usuário modificou

    //geramos um salt aleatorio
  
    bcrypt.genSalt((err, salt) => {
        // console.log(salt)
        //gerando senha diferente a cada inicializacao por conta do hash
        bcrypt.hash(user.password, salt, function(err, hash) {
            //sobrescrevemos a senha do usuário atual que será salvo no bd 
            user.password = hash 
            console.log(user)
            next() //passa para o próximo middleware
        })
    })
})


//checkar password - preciso da function para pegar o contexto this que vem do objeto passado
//criando método assincrono
UserSchema.methods.checkPassword = function(password){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, this.password, (err, isMatch)=>{
            if(err){
                reject(err)
            }else{
                resolve(isMatch)
            }
        })
    })
}


//model - ligando-nos à collection User com o schema
const User = mongoose.model('User', UserSchema)


module.exports = User