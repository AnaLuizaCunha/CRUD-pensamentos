import api from './api.js';

const ui = {
    async renderThoughts() {
        const thoughtsList = document.getElementById('lista-pensamentos');
        thoughtsList.innerHTML = '';
        try {
            const thoughts = await api.getThoughts();
            thoughts.forEach(ui.addThoughtToList);
        } catch {
            alert('Erro ao tentar acessar a API');   
        }
    },

    addThoughtToList(thought) {
        const thoughtsList = document.getElementById('lista-pensamentos');
        const li = document.createElement('li');     
        li.setAttribute('data-id', thought.id);
        li.classList.add('li-pensamento');
        
        const iconQuotationMarks = document.createElement('img');
        iconQuotationMarks.src = 'assets/imagens/aspas-azuis.png';
        iconQuotationMarks.alt = 'Aspas azuis';
        iconQuotationMarks.classList.add('icone-aspas');

        const thoughtContent = document.createElement('div');
        thoughtContent.textContent = thought.conteudo;
        thoughtContent.classList.add('pensamento-conteudo');
        
        const thoughtAuthorship = document.createElement('div');
        thoughtAuthorship.textContent = thought.autoria;
        thoughtAuthorship.classList.add('pensamento-autoria');
        
        li.appendChild(iconQuotationMarks);
        li.appendChild(thoughtContent);
        li.appendChild(thoughtAuthorship);
        thoughtsList.appendChild(li);
        
    }
}

export default ui;