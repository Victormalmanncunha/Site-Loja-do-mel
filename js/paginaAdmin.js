const produtosNoSite = document.querySelector('#produtos')
const form = document.querySelector('#form')

function pegarProdutos(callback){
    const req = new XMLHttpRequest();

    req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const produtos = JSON.parse(req.responseText);
        if (produtos) {
            callback(produtos)
        }
    }
    }
    req.open("GET", "http://localhost:3000/product", true);
    req.send();     
}

pegarProdutos(function (produtos){
    for(i in produtos){
        produtosNoSite.innerHTML += `<li>Nome:${produtos[i].name}<br>Valor:${produtos[i].price}R$<br>Imagem:${produtos[i].image}<br><button class="botaoEditar" onclick="editarProduto(${i})">Editar</button><button class="botaoApagar" onclick="apagarProduto(${i})">Apagar</button></li>`
        
    }
})

function apagarProduto(numero) {
    pegarProdutos(function (produtos){
        form.innerHTML = `Deseja remover o item ${produtos[numero].name}?<br><button class="botaoApagar" onclick="confirmarApagar(${numero})">Apagar</button>`
        window.scrollTo(0, 0)
    })
}
function confirmarApagar(numero){
    pegarProdutos(function (produtos){
        const req = new XMLHttpRequest();
        let id = produtos[numero]._id
        req.open("DELETE", "http://localhost:3000/product" + `/${id}`, true);
        req.send();
        location.reload();
    })
}
function adicionarProduto(){
    form.innerHTML = `<h2>Adição de produto</h2><br>Nome do produto:<br><input type="text" name="nomeDoProduto" id="nomeDoProduto"><br>Preço do produto:<br><input type="number" name="precoDoProduto" id="precoDoProduto"><br>Url da imagem do produto:<br><input type="text" name="imagemDoProduto" id="imagemDoProduto"><br><button id="botaoAdicionar" onclick="confirmarAdicionar()">Confirmar<button>`
}
function confirmarAdicionar(){
    const nome = document.querySelector('#nomeDoProduto')
    const preco = document.querySelector('#precoDoProduto')
    const url = document.querySelector('#imagemDoProduto')
    const req = new XMLHttpRequest();
    const data = {
        name: nome.value,
        price: preco.value,
        image: url.value
    }
    req.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 201) {
                location.reload();
            } else if (this.status == 401) {
                const responseText = JSON.parse(req.responseText);
                console.error(responseText.message);
            } else {
                console.error("Error:", this.status);
            }
        }
    }
    req.open("POST", "http://localhost:3000/product", true);
    req.setRequestHeader("Content-type", "application/json")
    req.send(JSON.stringify(data)); 
}
function editarProduto(numero) {
    pegarProdutos(function (produtos) {
        form.innerHTML = `<h2>Editando ${produtos[numero].name}</h2><br>Nome do produto:<br><input type="text" name="nomeDoProduto" id="nomeDoProduto"><br>Preço do produto:<br><input type="number" name="precoDoProduto" id="precoDoProduto"><br>Url da imagem do produto:<br><input type="text" name="imagemDoProduto" id="imagemDoProduto"><br><button id="botaoAdicionar" onclick="confirmarEdicao(${numero})">Confirmar<button>`
    })
}
function confirmarEdicao(numero) {
    pegarProdutos(function (produtos){
        const mongoId = produtos[numero]
        const nome = document.querySelector('#nomeDoProduto')
        const preco = document.querySelector('#precoDoProduto')
        const url = document.querySelector('#imagemDoProduto')
        const req = new XMLHttpRequest();
        const data = {}
        if(nome.value) data.name = nome.value
        if(preco.value) data.price = preco.value
        if(url.value) data.image = url.value
        req.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    location.reload();
                } else if (this.status == 401) {
                    const responseText = JSON.parse(req.responseText);
                    console.error(responseText.message);
                } else {
                    console.error("Error:", this.status);
                }
            }
        }
        req.open("PATCH", `http://localhost:3000/product/${mongoId._id}`, true);
        req.setRequestHeader("Content-type", "application/json")
        req.send(JSON.stringify(data));
    })
}