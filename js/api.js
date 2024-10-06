const URL_BASE = 'http://localhost:3000'

const api = {
    async getThoughts() {
      try {
        const response = await axios.get(`${URL_BASE}/pensamentos`);
        return await response.data
      }
      catch {
        alert('Erro ao buscar pensamentos')
        throw error
      }
    },

    async saveThoughts(thought) {
      try {
        const response = await axios.post(`${URL_BASE}/pensamentos`, thought);
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
        return await response.data
      }
      catch {
        console.log(error)
        alert('Erro ao buscar pensamento')
        throw error
      }
    },

    async editThought(thought) {
      try {
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
    }

  }
  
  export default api