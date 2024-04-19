const router = require('express').Router()
const Product = require('../models/Product')

router.post('/', async (req, res) => {

    //req.body
    const {name, price, image} = req.body
    
    if(!name) {
        res.status(422).json({error: "O nome é obrigatorio"})
        return
    }
    if(!price) {
        res.status(422).json({error: "O preço é obrigatorio"})
        return
    }
    const product = {
        name,
        price,
        image
    }

    try {

        await Product.create(product)
    
        res.status(201).json({message: 'Produto inserido no sistema com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})
    }
} )

router.get('/', async (req, res) => {
    try {
        
        const product = await Product.find()

        res.status(200).json(product)
    
    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisição
    const id = req.params.id

    try {
        const product = await Product.findOne({_id: id})

        if(!product) {
            res.status(422).json({message: 'O produto não foi encontrado'})
            return
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Update - atualização de dados (put, patch)

router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const { name, price, image } = req.body

    const product = {
        name,
        price,
        image
    }

    try {
        
        const updatedProduct = await Product.updateOne({_id: id}, product)

        if(updatedProduct.matchedCount === 0){
            res.status(422).json({message: 'O produto não foi encontrado'})
            return
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({error: error})
        
    }
})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const product = await Product.findOne({_id: id})

    if(!product) {
        res.status(422).json({message: 'O produto não foi encontrado'})
        return
    }
    try {
        await Product.deleteOne({_id: id})
        res.status(200).json({message: "Produto removido com sucesso"})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router