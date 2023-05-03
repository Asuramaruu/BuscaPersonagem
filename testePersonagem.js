//npm init -y
//npm install axios
//node .\testeCEP.js

const axios = require('axios');

async function buscarPersonagem(id) {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Não foi possível encontrar esse personagem');
  }
}

// Exemplo de uso da função buscarEndereco
buscarPersonagem('673')
  .then(Hoovy => console.log(Hoovy))
  .catch(error => console.error(error.message));

module.exports = {
    buscarPersonagem
}