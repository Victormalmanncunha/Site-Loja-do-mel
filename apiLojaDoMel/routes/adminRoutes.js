const ContaAdmin = require('../models/ContaAdmin')
const router = require('express').Router()

router.post('/', async (req, res) => {
    
    try {
        const {nome, senha} = req.body
        const admin = await ContaAdmin.find()
        console.log(nome, senha, admin)
        if(nome != admin[0].nome || senha != admin[0].senha) {
            res.status(401).json({
                message: "Acesso negado: Nome ou senha errado.",
                acessoPermitido: false
            })
        }else{
            res.status(200).json({
                message: "Olá ADM",
                acessoPermitido: true
            })
        }
    } catch (error) {
        
    }
})



module.exports = router