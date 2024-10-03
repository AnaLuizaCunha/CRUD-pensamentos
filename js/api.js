const api = {
    async getThoughts() {
      try {
        const response = await fetch('http://localhost:3000/pensamentos')
        return await response.json()
      }
      catch {
        alert('Erro ao buscar pensamentos')
        throw error
      }
    },

    async saveThoughts(thought) {
      try {
        const response = await fetch('http://localhost:3000/pensamentos', {
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
        const response = await fetch(`http://localhost:3000/pensamentos/${id}`);
        return await response.json()
      }
      catch {
        alert('Erro ao buscar pensamento')
        throw error
      }
    },

    async editThought(thought) {
      try {
        const response = await fetch(`http://localhost:3000/pensamentos/${thought.id}`, {
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



    
  }
  
  export default api