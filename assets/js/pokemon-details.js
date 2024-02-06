const detailsPokemons = document.getElementById("detailsPokemons");
const namePokemons = document.getElementById("namePokemons");


function LoadNamePokemons(id) {
    pokeApi
      .getDetailsPokemons(id) 
      .then((pokemon) => { 
        
        const newHtml = `<div class="pokemon ${pokemon.type}">
                
        <a href="javascript:history.back()" class="backArrow" title="Voltar"><img src="/img/de-volta.png" alt="voltar"></a>
        <span class="name">${pokemon.name}</span>
          <span class="number">#${pokemon.number}</span>
          <div class="detail">
              <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
              </ol>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
          </div>`;
        
        namePokemons.innerHTML = newHtml;
      })
      .catch((error) => console.log(error));
  }
function LoadMenuDetails(id) {
    pokeApi
      .getDetailsPokemons(id)
      .then((pokemon ) => {
        const newHtml = `<ul class="menuDetailsPokemon">
            <li><a href="#about">About</a></li>
            <li><a href="#baseStast">Base Stast</a></li>
            <li><a href="#evolution">Evolution</a></li>
            <li><a href="#moves">Moves</a></li>
        </ul>
        
        <article id="abasDetails">
        
        <section id="about" class="active">
        <table class="tbDetails">
            <!-- Species -->
            <tr>
                <th>Species</th>
                <td>${pokemon.species}</td>
            </tr>
            <!-- Weight -->
            <tr>
                <th>Weight</th>
                <td>${pokemon.weight} kg </td>
            </tr>
            <!-- Height -->
            <tr>
                <th>Height</th>
                <td>${pokemon.height} cm </td>
            </tr>
            <!-- Ability -->
            <tr>
                <th>Ability</th>
                <td>${pokemon.abilities}</td>
            </tr>
            <!-- Adicione mais linhas aqui conforme necessário -->
        </table>
    </section>
        
            <section id="baseStast">
                <p>Conteúdo da aba 2</p>
            </section>
        
            <section id="evolution">
                <p>Conteúdo da aba 3</p>
            </section>
        
            <section id="moves">
                <p>Conteúdo da aba 4</p>
            </section>
        
        </article>`;
        detailsPokemons.innerHTML = newHtml;
        addTabsEventListeners()
      })
      .catch((error) => console.log(error));
      }



document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id'); // Captura o ID do Pokémon da URL
    
    if (pokemonId) {
      console.log("ID do Pokémon:", pokemonId);
      LoadNamePokemons(pokemonId);
        LoadMenuDetails(pokemonId);
    }
  });

// Esta função adiciona ouvintes de eventos às abas
function addTabsEventListeners() {
    var tabs = document.querySelectorAll('.menuDetailsPokemon li');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            var activeTab = document.querySelector('.menuDetailsPokemon li.active');
            var activeSection = document.querySelector('article#abasDetails section.active');

            // Remove a classe 'active'
            if (activeTab) activeTab.classList.remove('active');
            if (activeSection) activeSection.classList.remove('active');

            // Adiciona a classe 'active' à aba clicada
            this.classList.add('active');

            // Pega o href do link dentro da aba para saber qual seção mostrar
            var link = this.querySelector('a').getAttribute('href');

            // Mostra a seção correspondente
            var matchingSection = document.querySelector(link);
            if (matchingSection) matchingSection.classList.add('active');
        });
    });

    

}