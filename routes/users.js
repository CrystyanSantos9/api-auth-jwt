const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const userControleller = require('../controllers/users')
const User = require('../models/users')

//preciso enviar como objeto para que el extrai lá no controller com { User }
const models = {
    User
}

router.get('/', userControleller.list.bind(null, models))
router.post('/', userControleller.register.bind(null, models))
router.post('/session', userControleller.session.bind(null, models))
router.put('/:id', userControleller.update.bind(null, models))
router.delete('/:id', userControleller.remove.bind(null, models))


module.exports = router