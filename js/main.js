import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const formThought = document.getElementById('pensamento-form');
    formThought.addEventListener('submit', handleFormSubmission);


})

async function handleFormSubmission(event) {
    event.preventDefault();
    console.log('Form submission event triggered');

    const id = document.getElementById('pensamento-id').value;
    const conteudo = document.getElementById('pensamento-conteudo').value;
    const autoria = document.getElementById('pensamento-autoria').value;
    
    try {
        await api.saveThoughts({ conteudo, autoria });
        // await api.saveThoughts(thought);
        ui.renderThoughts();
    }
    catch {
        alert('Erro ao salvar pensamento');
    }

}