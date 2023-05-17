const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const Pergunta = require('./database/models/Pergunta');
const Resposta = require('./database/models/Resposta');

connection.authenticate()
    .then(() => {console.log("Logado no BD")})
    .catch(err => {console.log("Erro ao conectar ao BD", err)})

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    Pergunta.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then(perguntas => {
        res.render('home', {
            perguntas
        });
    });
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
})

app.post('/salvarDados', (req, res) => {
    const {titulo, descricao}  =req.body;
    Pergunta.create({ titulo, descricao})
        .then(() => {res.redirect("/")});
})

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id;
    Pergunta.findOne({where: {id}})
        .then( pergunta => {
            if (pergunta != null) {
                Resposta.findAll({where: {perguntaId:pergunta.id}, order: [['id', 'DESC']]})
                    .then(respostas => { res.render("pergunta", { pergunta, respostas }); })
            } else { res.redirect("/") }
        });
})

app.post('/resposta', (req, res) => {
    const {corpo, perguntaId} = req.body;
    Resposta.create({
        corpo,
        perguntaId
    }).then(() => {
        res.redirect('/pergunta/'+ perguntaId);
    });
});


app.listen('8080', () => console.log('Server is running'))