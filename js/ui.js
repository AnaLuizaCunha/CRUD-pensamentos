import api from './api.js';

const ui = {

    async fillForm(thoughtId) {
        const thought = await api.getThoughtById(thoughtId);
        document.getElementById('pensamento-id').value = thought.id;
        document.getElementById('pensamento-conteudo').value = thought.conteudo;
        document.getElementById('pensamento-autoria').value = thought.autoria;
    },

    cleanForm() {
        document.getElementById('pensamento-form').reset();
    },

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
        
        const btnEdit = document.createElement('button');
        btnEdit.classList.add('botao-editar');
        btnEdit.onclick = () => ui.fillForm(thought.id);

        const iconEdit = document.createElement('img');
        iconEdit.src = 'assets/imagens/icone-editar.png';
        iconEdit.alt = 'Editar pensamento';

        btnEdit.appendChild(iconEdit);

        const icons = document.createElement('div');
        icons.classList.add('icones');
        icons.appendChild(btnEdit);

        li.appendChild(iconQuotationMarks);
        li.appendChild(thoughtContent);
        li.appendChild(thoughtAuthorship);
        li.appendChild(icons);
        thoughtsList.appendChild(li);
        
    }
}

export default ui;