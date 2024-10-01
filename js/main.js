import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const formThought = document.getElementById('pensamento-form');
    // formThought.addEventListener('submit', handleFormSubmission);

    if (formThought) {
        console.log('Form found');
        formThought.addEventListener('submit', handleFormSubmission);
    } else {
        console.log('Form not found');
    }


})

async function handleFormSubmission(event) {
    event.preventDefault();
    console.log('Form submission event triggered');

    const idElement = document.getElementById('pensamento-id');
    const contentElement = document.getElementById('pensamento-conteudo');
    const authorshipElement = document.getElementById('pensamento-autoria');

    // console.log(content);
    // console.log(authorship);

    // try {
    //     await api.saveThoughts({ content, authorship });
    //     ui.renderThoughts();
    // }
    // catch {
    //     alert('Erro ao salvar pensamento');
    // }

    if (idElement && contentElement && authorshipElement) {
        const id = idElement.value;
        const content = contentElement.value;
        const authorship = authorshipElement.value;

        console.log('Content:', content);
        console.log('Authorship:', authorship);

        try {
            await api.saveThoughts({ content, authorship });
            ui.renderThoughts();
        }
        catch (error){
            console.error('Erro ao salvar pensamento:', error);
            alert('Erro ao salvar pensamento');
        }
    } else {
        console.log('One or more input elements not found');
    }
}