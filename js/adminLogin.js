const nomeInput = document.querySelector('#nome')
const senhaInput = document.querySelector('#senha')
const botao = document.querySelector('.botao')

function botaoClique(){
        botao.addEventListener('click', e => {
        e.preventDefault();
        console.log('botaoclicado')
        checarLogin();
    })
}
botaoClique();

function checarLogin() {
    const req = new XMLHttpRequest();

    const nomeValue = nomeInput.value
    const senhaValue = senhaInput.value

    const data = {
        nome: nomeValue,
        senha: senhaValue
    }

    req.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const responseText = JSON.parse(req.responseText);
                console.log(responseText.message);
                document.location = 'admin.html'
            } else if (this.status == 401) {
                const responseText = JSON.parse(req.responseText);
                console.error(responseText.message);
            } else {
                console.error("Error:", this.status);
            }
        }
    };
    req.open("POST", "http://localhost:3000/admin", true);
    req.setRequestHeader("Content-type", "application/json")
    req.send(JSON.stringify(data));        	 
}
