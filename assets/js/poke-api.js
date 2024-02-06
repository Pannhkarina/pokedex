
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name)
    const [ability] = abilities
    
    pokemon.abilities = abilities
    pokemon.ability = ability

    
    pokemon.height = pokeDetail.height / 10

    pokemon.species = pokeDetail.species.name

    pokemon.weight = pokeDetail.weight 


    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {

const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
return fetch(url)
  //Arrow Function
  .then((response) => response.json())
  .then((jsonBody) => jsonBody.results)
  .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
  .then((detailsRequests) => Promise.all(detailsRequests))
  .then((pokemonDetails) => pokemonDetails)

  .catch((error) => console.log(error));

}

pokeApi.getDetailsPokemons = (id = 1) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  return fetch(url)
    .then((response) => response.json())
    .then((pokemonDetails) => {
      // Aqui você pode chamar `convertPokeApiDetailToPokemon` se necessário
      // para converter os detalhes do Pokémon no formato desejado.
      return convertPokeApiDetailToPokemon(pokemonDetails);
    })
    .catch((error) => console.log(error));
};



