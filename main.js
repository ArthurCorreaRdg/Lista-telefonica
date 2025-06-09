const contatos = [];

const form = document.getElementById('form-contato');
const list = document.getElementById('lista-contatos');
const pesquisar = document.getElementById('pesquisar');
const telefoneInput = document.getElementById('telefone');

let indiceEditando = null;

// Máscara para telefone
telefoneInput.addEventListener('input', function () {
    let v = telefoneInput.value;
    v = v.replace(/\D/g, '');

    if (v.length > 11) v = v.slice(0, 11);

    if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (v.length > 0) {
        v = v.replace(/^(\d*)/, '($1');
    }

    telefoneInput.value = v;
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = telefoneInput.value.trim();
    const email = document.getElementById('email').value.trim();

    // Verifica duplicidade se não estiver editando
    if (indiceEditando === null) {
        const duplicado = contatos.some(c => c.nome === nome && c.telefone === telefone);
        if (duplicado) {
            alert("Contato já existe!");
            return;
        }

        contatos.push({ nome, telefone, email });
    } else {
        // Atualiza o contato
        contatos[indiceEditando] = { nome, telefone, email };
        indiceEditando = null;
    }

    mostrarContatos(contatos);
    form.reset();
});

// Campo de busca
pesquisar.addEventListener('input', function () {
    const texto = pesquisar.value.toLowerCase();
    const filtrados = contatos.filter(contato => contato.nome.toLowerCase().includes(texto));
    mostrarContatos(filtrados);
});

// Exibe os contatos na tabela
function mostrarContatos(listaFiltrada) {
    list.innerHTML = '';

    listaFiltrada.forEach((contato, index) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.telefone}</td>
            <td>${contato.email}</td>
            <td class="acoes">
                <button class="botao-icon" onclick="editarContato(${index})">✏️</button>
                <button class="botao-icon" onclick="removerContato(${index})">🗑️</button>
            </td>
        `;

        list.appendChild(linha);
    });
};

// Remover contato
function removerContato(index) {
    contatos.splice(index, 1);
    mostrarContatos(contatos);
};

// Editar contato
function editarContato(index) {
    const contato = contatos[index];

    document.getElementById('nome').value = contato.nome;
    telefoneInput.value = contato.telefone;
    document.getElementById('email').value = contato.email;

    indiceEditando = index;
};
