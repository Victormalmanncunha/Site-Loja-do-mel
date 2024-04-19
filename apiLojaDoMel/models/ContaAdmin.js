const mongoose = require('mongoose')

const ContaAdmin = mongoose.model('ContaAdmin', {
    nome: String,
    senha: String
})

module.exports = ContaAdmin