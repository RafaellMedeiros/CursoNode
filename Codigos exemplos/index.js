const express = require('express')
const { SeachInList } = require('./util/FunctionIndex.js')
const app = express()

app.get('/', (req, res) => {
    res.send("Servidor de Rafael")
})

app.get('/route/one', (req, res) => {
    res.send("Opa Meu Parceiro 1")
})

app.get('/route/two', (req, res) => {
    res.send("Opa Meu Parceiro 2")
})

app.get('/filter', (req, res) => {
    const name = req.query.name

    res.send(`Oi ${name}`)
})

app.listen(4000, (err) => {
    if (err) {
        console.log('Failed to start the server !')
    } else {
        console.log('Server initialized');
    }
})