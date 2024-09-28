import api from './api.js';

const ui = {
    async renderThoughts() {
        const thoughtsList = document.getElementById('lista-pensamentos');
        try {
            const thoughts = await api.getThoughts();
            thoughts.forEach(thought => {
                thoughtsList.innerHTML += `
                    <li class="li-pensamento" data-id="${thought.id}">
                        <img src="assets/imagens/aspas-azuis.png" alt="Aspas azuis" class="icone-aspas">
                        <div class="pensamento-conteudo">${thought.conteudo}</div>
                        <div class="pensamento-autoria">${thought.autoria}</div>
                    </li>
                `
            });
        } catch {
            alert('Erro ao tentar acessar a API');   
        }
    }
}

export default ui;