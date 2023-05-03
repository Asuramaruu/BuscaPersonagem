//npm install jest

////Para configurar o jest como script de teste deve-se editar o 'package.json'
//No agrupamento "scripts": {
//    "test": "echo \"Error: no test specified\" && exit 1"
//  }, alterar para:
//"scripts": {
//    "test": "jest"
//  },
//Para executar os testes:
//npm test

const axios = require('axios');
const { buscarPersonagem } = require('./testePersonagem');

jest.mock('axios');

describe('Teste API Rick e Morty', () => {
  it('Deve retornar as informações do personagem solicitado', async () => {
    const data = {
      id:673,
      name:"Hoovy",
      status:"Dead",
      species:"Humanoid",
      type:"Narnian",
      gender:"Male",
      origin:{
        name:"Narnia Dimension",
        url:"https://rickandmortyapi.com/api/location/110"
      },
      location:{
        name:"Narnia Dimension",
        url:"https://rickandmortyapi.com/api/location/110"
      },
      image:"https://rickandmortyapi.com/api/character/avatar/673.jpeg",
      episode:["https://rickandmortyapi.com/api/episode/42"],
      url:"https://rickandmortyapi.com/api/character/673",
      created:"2021-10-16T12:08:41.055Z"
    };



    axios.get.mockResolvedValue({ data });

    const Hoovy = await buscarPersonagem(data.id);

    expect(Hoovy).toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/673');
  });

  it('Deve lançar um personagem válido', async () => {
    const errorMessage = 'Não foi possível encontrar esse personagem';
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(buscarPersonagem(999)).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/999');
  });
});