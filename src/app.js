import express from 'express'

const app = express()

app.use(express.json())

//mock
const selecoes = [
    {id: 1, selecao: 'Brasil', grupo: 'G'},
    {id: 2, selecao: 'Suiça', grupo: 'G'},
    {id: 3, selecao: 'Sérvia', grupo: 'G'},
    {id: 4, selecao: 'Camarões', grupo: 'G'}
]


function buscarSelecaoPorId(id) {
    return selecoes.filter( selecao => selecao.id == id)
}


function buscaIndexSelecao(id) {
    return selecoes.findIndex( selecao => selecao.id == id)
}

// criar rota padrão ou raiz
app.get('/', (req, res) => {
    res.send('Curso de Node Js')
})


app.get('/selecoes', (req, res) => {
    res.status(200).send(selecoes)
})


app.get('/selecoes/:id', (req, res) => {
    let index = req.params.id
    res.json(buscarSelecaoPorId(req.params.id))
})


app.post('/selecoes', (req, res) => {
    selecoes.push(req.body)
    res.status(201).send('Seleção cadastrada com sucesso!')
})


app.delete('/selecoes/:id', (req, res) => {
    let index = buscaIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`Seleção com id ${req.params.id} excluída com sucesso!`)
})


app.put('/selecoes/:id', (req, res) => {
    let index = buscaIndexSelecao(req.params.id)
    selecoes[index].selecao = req.body.selecao
    selecoes[index].grupo   = req.body.grupo
    res.send(selecoes)
})

export default app