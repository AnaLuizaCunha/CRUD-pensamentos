const URL_BASE = 'http://localhost:3000'

const api = {
    async getThoughts() {
      try {
        const response = await fetch(`${URL_BASE}/pensamentos`);
        return await response.json()
      }
      catch {
        alert('Erro ao buscar pensamentos')
        throw error
      }
    },

    async saveThoughts(thought) {
      try {
        const response = await fetch(`${URL_BASE}/pensamentos`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(thought) // objeto js que será convertido para JSON
        })
        return await response.json()
      }
      catch {
        alert('Erro ao salvar pensamentos')
        throw error
      }
    },

    async getThoughtById(id) {
      try {
        const response = await fetch(`${URL_BASE}/pensamentos${id}`);
        return await response.json()
      }
      catch {
        alert('Erro ao buscar pensamento')
        throw error
      }
    },

    async editThought(thought) {
      try {
        const response = await fetch(`${URL_BASE}/pensamentos${thought.id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(thought) // objeto js que será convertido para JSON
        })
        return await response.json()
      }
      catch {
        alert('Erro ao editar pensamento')
        throw error
      }
    },

    async deleteThought(id) {
      try {
        const response = await fetch(`${URL_BASE}/pensamentos${id}`, {
          method: 'DELETE',
        })
      }
      catch {
        alert('Erro ao excluir pensamento')
        throw error
      }
    }

  }
  
  export default api