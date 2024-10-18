import ui from './ui.js';
import api from './api.js';

const regexContent = /^[A-Za-z\s]{10,}$/ // regex = expressao regular; 
// 1. O símbolo ^ significa "começar a olhar desde o início do texto".
// 2. [A-Za-z\s] diz que estamos procurando por letras maiúsculas (A-Z), letras minúsculas (a-z), e espaços (\s).
//    - Isso significa que o texto só pode ter letras ou espaços.
// 3. {10,} significa que o texto precisa ter pelo menos 10 letras ou espaços.
//    - O número 10 quer dizer "no mínimo 10 caracteres", e o símbolo "," quer dizer que pode ter mais de 10 também!
// 4. O símbolo $ significa "olhar até o final do texto".
//    - Ou seja, a expressão regular vai verificar se todo o texto segue essas regras até o final!

// Resumindo: Essa regex garante que o texto tenha pelo menos 10 letras ou espaços, e nada mais!

const regexAuthorship = /^[A-Za-z\s]{3,15}$/ // regex = expressao regular;

function validateContent(content) {
    return regexContent.test(content); // test() é um método que verifica se o texto passado como argumento segue a expressão regular. retorna um booleano
}

function validateAuthorship(authorship) {
    return regexAuthorship.test(authorship);
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const formThought = document.getElementById('pensamento-form');
    const btnCancel = document.getElementById("botao-cancelar");

    const inputSearch = document.getElementById('campo-busca');

    formThought.addEventListener('submit', handleFormSubmission);
    btnCancel.addEventListener('click', handleCancel);
    inputSearch.addEventListener('input', handleSearch);


})

async function handleFormSubmission(event) {
    event.preventDefault();

    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    const data = document.getElementById('pensamento-data').value;

    if (!validateContent(conteudo)) {
        alert('Permitada a inclusao de letras e espacos, com no minimo 10 caracteres');
        return
    }

    if (!validateAuthorship(autoria)) {
        alert('Permitida a inclusao de letras e espacos, com no minimo 3 caracteres e no maximo 15');
        return
    }
    if (!validateDate(data)) {
        alert('Data inválida, selecione outra data');
        return
    }

    try {
        if(id) {
            await api.editThought({ id, conteudo, autoria, data });
        } else {
            await api.saveThoughts({ conteudo, autoria, data });
        }
        ui.renderThoughts();
    }
    catch {
        alert('Erro ao salvar pensamento');
    }
}

function handleCancel() {
    ui.cleanForm();
}

async function handleSearch() {
    const wordSearch = document.getElementById('campo-busca').value;
    try {
        const filteredThoughts = await api.getThoughtByWord(wordSearch);
        ui.renderThoughts(filteredThoughts);
    } catch (error) {
        alert('Erro ao buscar pensamento');
    }
}

function validateDate(data) {
    const actualDate = new Date();
    const insertedDate = new Date(data);
    return insertedDate <= actualDate;
}