// Selecionando elementos HTML pelo seletor de classe e atribuindo-os a variáveis
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Inicializa a variável de pesquisa com o número 1
let searchPokemon = 1;

// Função assíncrona para buscar dados do Pokémon na API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  // Verifica se a resposta da API é bem-sucedida (status 200)
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    console.log(APIResponse, 'Resposta ok')
    return data;
  }
}

// Função para renderizar os detalhes do Pokémon na página
const renderPokemon = async (pokemon) => {
  // Define temporariamente o nome como 'Loading...' e remove o número
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  // Chama a função para buscar dados do Pokémon
  const data = await fetchPokemon(pokemon);

  if (data) {
    // Se os dados do Pokémon foram encontrados, exibe as informações na página
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''; // Limpa o campo de pesquisa
    searchPokemon = data.id; // Atualiza o valor da variável de pesquisa
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o comportamento padrão de recarregar a página
        renderPokemon(input.value.toLowerCase()); // Chama a função renderPokemon com o valor do campo de pesquisa em letras minúsculas 
       
      });
      
  } else {
    // Se os dados do Pokémon não foram encontrados, exibe uma mensagem de 'Not found'
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

// Adiciona um ouvinte de evento ao formulário para pesquisar o Pokémon
// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // Evita o comportamento padrão de recarregar a página
//   renderPokemon(input.value.toLowerCase()); // Chama a função renderPokemon com o valor do campo de pesquisa em letras minúsculas
// });


// Adiciona um ouvinte de evento ao botão de "Anterior" para exibir o Pokémon anterior
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) { // Verifica se o número de pesquisa é maior que 1
    searchPokemon -= 1; // Reduz o número de pesquisa
    renderPokemon(searchPokemon); // Chama a função renderPokemon com o novo número de pesquisa
  }
});

// Adiciona um ouvinte de evento ao botão de "Próximo" para exibir o próximo Pokémon
buttonNext.addEventListener('click', () => {
  searchPokemon += 1; // Aumenta o número de pesquisa
  renderPokemon(searchPokemon); // Chama a função renderPokemon com o novo número de pesquisa
});

// Renderiza o Pokémon inicialmente com o número de pesquisa padrão (1)
renderPokemon(searchPokemon);
