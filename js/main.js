import ui from './ui.js';
import api from './api.js';

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