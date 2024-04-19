//config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

//forma de ler json / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// rotas da api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

const productRoutes = require('./routes/productRoutes')

app.use('/product', productRoutes)

const adminRoutes = require('./routes/adminRoutes')

app.use('/admin', adminRoutes)
//rota inicia / endpoint
app.get('/', (req, res) =>{

    //mostrar req

    res.json({ message: 'Oi express' })

})

//mongodb+srv://Victor:60yZTDJDGAKboaNV@apicluster.qapzi89.mongodb.net/?retryWrites=true&w=majority&appName=apicluster

//60yZTDJDGAKboaNV

//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.qapzi89.mongodb.net/?retryWrites=true&w=majority&appName=apicluster`)

.then(() => {
    console.log("conectamos ao mongodb")
    app.listen(3000)
})
.catch((err) => console.log(err))