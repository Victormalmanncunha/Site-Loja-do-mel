const botaoFiltrar = document.querySelector('.botaoFiltrar')
const liDeProdutos = document.querySelector('#lista-de-produtos')
const filtragemSelecionada = document.querySelector('#filtragem')
function botaoClique() {
    botaoFiltrar.addEventListener('click', e => {
        e.preventDefault();
        filtrarProdutos();
    })
}
botaoClique();

function listarProdutos(filtragem) {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const produtos = JSON.parse(req.responseText);
        console.log(produtos)
        liDeProdutos.innerHTML = ''
        if (produtos && filtragem) {
            if (filtragemSelecionada.value === 'menor-preco-ao-maior') produtosFiltrados = produtos.sort(function(a,b){return a.price - b.price})
            if (filtragemSelecionada.value === 'maior-preco-ao-menor') produtosFiltrados = produtos.sort(function(a,b){return b.price - a.price})
            for (let i in produtos){
                liDeProdutos.innerHTML += `<li><div><img src="${produtos[i].image}"><br>${produtos[i].name}<br>R$${produtos[i].price}</div></li>`
            }
        } else if (produtos) {
            for (let i in produtos){
                liDeProdutos.innerHTML += `<li><div><img src="${produtos[i].image}"><br>${produtos[i].name}<br>R$${produtos[i].price}</div></li>`
            }
        }

    }
    }

    req.open("GET", "http://localhost:3000/product", true);
    req.send();        	 
}

listarProdutos();

function filtrarProdutos() {
    listarProdutos(filtragemSelecionada)
}