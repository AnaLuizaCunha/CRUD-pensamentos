import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const formThought = document.getElementById('pensamento-form');
    const btnCancel = document.getElementById("botao-cancelar");

    formThought.addEventListener('submit', handleFormSubmission);
    btnCancel.addEventListener('click', handleCancel);


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