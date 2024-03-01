const botaoFiltrar = document.querySelector('.botaoFiltrar')
const liDeProdutos = document.querySelector('#lista-de-produtos')
const filtragemSelecionada = document.querySelector('#filtragem')
const produtos = [
    poteDeMel = {
        nome: 'Pote de mel',
        valor: 44.50,
        imagem: 'https://storage.googleapis.com/phygital_files/primato/uploads/produto/mel_apitoledo_1kg_pote_f44fbe99-dd9d-40f9-bc06-30d4191f9803.jpeg'
    },
    ceraDeAbelha = {
        nome: 'Cera de abelha',
        valor: 8.95,
        imagem: 'https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia28924/cera-de-abelha-cursos-cpt.jpg'
    },
    extratoDePropolis = {
        nome: 'Extrato de própolis',
        valor: 63.95,
        imagem: 'https://cdn.vnda.com.br/1000x/boticaervadoce/2023/02/17/15_47_24_640_extrato-de-propolis-verde-apis-flora-30-ml.jpg?v=1676659644'
    },
]

function botaoClique() {
    botaoFiltrar.addEventListener('click', e => {
        e.preventDefault();
        filtrarProdutos();
    })
}
botaoClique();

function listarProdutos(produtosFiltrados) {
    for(let i in produtos){
        console.log(produtos[i].imagem)
        liDeProdutos.innerHTML += `<li><div><img src="${produtos[i].imagem}"><br>${produtos[i].nome}<br>R$${produtos[i].valor}</div></li>`
    }
    if (produtosFiltrados){
        liDeProdutos.innerHTML = ''
        for(let i in produtosFiltrados){
            console.log(produtosFiltrados[i].imagem)
            liDeProdutos.innerHTML += `<li><div><img src="${produtosFiltrados[i].imagem}"><br>${produtosFiltrados[i].nome}<br>R$${produtosFiltrados[i].valor}</div></li>`
        }
    }
}
listarProdutos();

function filtrarProdutos() {
    let produtosFiltrados = ''
    if (document.querySelector('#filtragem').value === 'menor-preco-ao-maior') produtosFiltrados = produtos.sort(function(a,b){return a.valor - b.valor})
    if (document.querySelector('#filtragem').value === 'maior-preco-ao-menor') produtosFiltrados = produtos.sort(function(a,b){return b.valor - a.valor})
    console.log(produtosFiltrados)
    listarProdutos(produtosFiltrados)
}