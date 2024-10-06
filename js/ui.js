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
        const emptyMessage = document.getElementById('mensagem-vazia');
        thoughtsList.innerHTML = '';

        try {
            const thoughts = await api.getThoughts();
            if(thoughts.length === 0) {
                emptyMessage.style.display = 'block';
            } else {
                emptyMessage.style.display = 'none';
                thoughts.forEach(ui.addThoughtToList);
            }  
        } catch (error) {
            console.log('Erro ao tentar acessar a API: ', error);
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

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('botao-excluir');
        btnDelete.onclick = async () => {
            try {
                await api.deleteThought(thought.id);
                ui.renderThoughts();
            } catch (error) {
                alert('Erro ao excluir pensamento');   
            }
        }

        const iconDelete = document.createElement('img');
        iconDelete.src = 'assets/imagens/icone-excluir.png';
        iconDelete.alt = 'Excluir pensamento';
        btnDelete.appendChild(iconDelete);

        const icons = document.createElement('div');
        icons.classList.add('icones');
        icons.appendChild(btnEdit);
        icons.appendChild(btnDelete);

        li.appendChild(iconQuotationMarks);
        li.appendChild(thoughtContent);
        li.appendChild(thoughtAuthorship);
        li.appendChild(icons);
        thoughtsList.appendChild(li);
        
    }
}

export default ui;