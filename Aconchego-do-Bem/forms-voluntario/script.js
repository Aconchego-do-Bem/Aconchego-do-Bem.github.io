var listaVoluntario = [];
var cont = 1;

function adicionarVoluntario(nome,ra){
    var novoVoluntario = {
        id: cont++, 
        nome: nome, 
        ra: ra,
        dataEnvio: new Date().toLocaleString()
    };
    listaVoluntario.push(novoVoluntario);
    localStorage.setItem('listaVoluntario', JSON.stringify(listaVoluntario));
    mostrarLista();
}

function localVoluntario(){
    var listaArmazenada = JSON.parse(localStorage.getItem('listaVoluntario'));
    listaVoluntario = listaArmazenada || [];
}

localVoluntario();

mostrarLista();

function limparCampos(){
    var elementosFormulario = document.querySelector('form').elements;
    for (var i = 0; i < elementosFormulario.length; i++) {
        var elemento = elementosFormulario[i];
        if (elemento.type !== 'checkbox' && elemento.type !== 'radio'){
            elemento.value = '';
        }
        if (elemento.type === 'checkbox' || elemento.type === 'radio'){
            elemento.checked = false;
        }
    }
}

document.querySelector("form").addEventListener('submit', function(evento){
    evento.preventDefault();
    var nome = document.getElementById('username');
    var ra = document.getElementById('ra');
    adicionarVoluntario(nome.value, parseInt(ra.value));
});

document.getElementById('limpar').addEventListener('click', function(evento){
    evento.preventDefault();
    limparCampos();
});

//Opções de excluir item da lista, excluindo da lista e do LocalStorage
function excluirVoluntario(idVoluntario) {
    var indice = listaVoluntario.findIndex(function (voluntario) {
        return voluntario.id === idVoluntario;
    });

    if (indice !== -1) {
        listaVoluntario.splice(indice, 1);
        localStorage.setItem('listaVoluntario', JSON.stringify(listaVoluntario));
        mostrarLista();
    }
}

function adicionarOuvintesExclusao() {
    var botoesExcluir = document.querySelectorAll('.excluir');
    botoesExcluir.forEach(function (botao) {
        botao.addEventListener('click', function () {
            var idVoluntario = parseInt(botao.getAttribute('data-id'));
            excluirVoluntario(idVoluntario);
        });
    });
}

function removerVoluntario(event) {
    var confirmacao = confirm("Tem certeza que deseja excluir este voluntário?");
    if (confirmacao) {
        var idVoluntario = parseInt(event.target.getAttribute('data-id'));
        excluirVoluntario(idVoluntario);
    }
}

//Opções de excluir todos os itens da lista, excluindo da lista e do LocalStorage
function excluirTodosVoluntarios() {
    var confirmacao = confirm("Tem certeza que deseja excluir todos os voluntários?");
    if (confirmacao) {
        listaVoluntario = [];
        localStorage.removeItem('listaVoluntario');
        mostrarLista();
    }
}

document.getElementById('excluirTodosVoluntarios').addEventListener('click', function (evento) {
    evento.preventDefault();
    excluirTodosVoluntarios();
});

function mostrarLista() {
    var itemListaVoluntario = document.getElementById('lista');
    itemListaVoluntario.innerHTML = '';

    listaVoluntario.forEach(function (voluntario) {
        var itemLista = document.createElement('li');
        itemLista.innerHTML = `
            <span>${voluntario.nome} - RA: ${voluntario.ra} - Voluntariou-se em ${voluntario.dataEnvio}</span>
            <button class="excluir" data-id="${voluntario.id}">Excluir</button>
        `;

        itemListaVoluntario.appendChild(itemLista);
    });

    
//pesquisar na lista de voluntarios   
function pesquisarLista(query) {
    var resultados = listaVoluntario.filter(function (voluntario) {
        return (
            voluntario.nome.toLowerCase().includes(query.toLowerCase()) ||
            voluntario.ra.toString().includes(query.toLowerCase()) ||
            
            voluntario.dataEnvio.toLowerCase().includes(query.toLowerCase())
        );
    });

    mostrarResultados(resultados);
}


function mostrarResultados(resultados) {
    var itemListaVoluntario = document.getElementById('lista');
    itemListaVoluntario.innerHTML = '';

    resultados.forEach(function (voluntario) {
        var itemLista = document.createElement('li');
        itemLista.innerHTML = `
            <span>${voluntario.nome} - RA: ${voluntario.ra} - Voluntariou-se em ${voluntario.dataEnvio}</span>
            <button class="excluir" data-id="${voluntario.id}">Excluir</button>
        `;

        itemListaVoluntario.appendChild(itemLista);
    });

    adicionarOuvintesExclusao();
}


document.getElementById('searchButton').addEventListener('click', function () {
    var searchQuery = document.getElementById('searchInput').value;
    pesquisarLista(searchQuery);
});



    adicionarOuvintesExclusao();
}