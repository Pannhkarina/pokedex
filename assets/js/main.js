const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHtml = pokemons
        .map(
          (pokemon) => `
          <button class="btnDetailsPokemon" data-id="${pokemon.number}" aria-label="Detalhes do ${pokemon.name}">
      <li class="pokemon ${pokemon.type}">
      
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>
      <div class="detail">
          <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
          </ol>
          <img
              src="${pokemon.photo}"
              alt="${pokemon.name}">
      </div>
      
  </li>
  </button>
 
  `).join("");
      pokemonList.innerHTML += newHtml;
      showDetailsPokemon();
    })
    .catch((error) => console.log(error));
}

function showDetailsPokemon() {
  const buttons = document.querySelectorAll('.btnDetailsPokemon');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      console.log("clicou botão details");
      const pokemonId = button.getAttribute('data-id');
      //const url = `pokemon-details.html`;
      const url = `pokemon-details.html?id=${pokemonId}`;
      window.location.href = url;
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsNexPage = offset + limit;

  console.log("click botão load");

  if (qtdRecordsNexPage >= maxRecords) {
    const newlimit = maxRecords - offset;
    loadPokemonItens(offset, newlimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});





