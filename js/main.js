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
    
    try {
        if(id) {
            await api.editThought({ id, conteudo, autoria });
        } else {
            await api.saveThoughts({ conteudo, autoria });
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