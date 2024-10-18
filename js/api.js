const URL_BASE = 'http://localhost:3000'

const convertStringToDateTime = (dateString) => {
  const [year, month, day] = dateString.split('-'); // 2024-12-31 = [2024, 12, 31] (retorno do split, desestruturação)
  return new Date(Date.UTC(year, month - 1, day)); // month - 1 pois o mês começa em 0
}

const api = {
    async getThoughts() {
      try {
        const response = await axios.get(`${URL_BASE}/pensamentos`);
        const thoughts = await response.data;

        return thoughts.map(thought => {
          return {
            ... thought, data: new Date(thought.data) // Converte a data para o formato Date
          }
        })
      }
      catch {
        alert('Erro ao buscar pensamentos')
        throw error
      }
    },

    async saveThoughts(thought) {
      try {
        const data = convertStringToDateTime(thought.data);
        const response = await axios.post(`${URL_BASE}/pensamentos`, { ...thought, data: data.toISOString() }); // Envia o pensamento com a data convertida
        return await response.data
      }
      catch {
        alert('Erro ao salvar pensamentos')
        throw error
      }
    },

    async getThoughtById(id) {
      try {
        const response = await axios.get(`${URL_BASE}/pensamentos/${id}`);
        const thought =  await response.data
        return {
          ... thought, data: new Date(thought.data) // Converte a data para o formato Date
        }
      }
      catch {
        console.log(error)
        alert('Erro ao buscar pensamento')
        throw error
      }
    },

    async editThought(thought) {
      try {
        // const data = convertStringToDateTime(thought.data);
        const response = await axios.put(`${URL_BASE}/pensamentos/${thought.id}`, thought); 
        return await response.data
      }
      catch {
        alert('Erro ao editar pensamento')
        throw error
      }
    },

    async deleteThought(id) {
      try {
        const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`, )
      }
      catch {
        alert('Erro ao excluir pensamento')
        throw error
      }
    },

    async getThoughtByWord(word) {
      try {
        const thoughts = await this.getThoughts();
        const wordLowerCase = word.toLowerCase();

        const filteredThoughts = thoughts.filter(thought => {
          return (thought.conteudo.toLowerCase().includes(wordLowerCase) || thought.autoria.toLowerCase().includes(wordLowerCase)); // Verifica se a palavra está no conteúdo ou no autor do pensamento
        });
      return filteredThoughts;
      } catch (error) {
        alert('Erro ao buscar pensamentos')
        throw error
      }
  },

  async updateFavorite(id, favorito) {
    try {
      const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito }); 
    } catch (error) {
      alert('Erro ao favoritar pensamento')
      throw error
    }
  }

}

export default api