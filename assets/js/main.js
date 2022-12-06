const pokemonList = document.getElementById('pokemonList')
const loadMore = document.getElementById('loadMore')
const limit = 5
let offset = 0;
const maxRecords = 151;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
    
                <div class="detail">
                    <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img 
                    src="${pokemon.photo}" 
                        src="${pokemon.photo}" 
                    src="${pokemon.photo}" 
                    onclick="clickPokemon(${pokemon.number})" 
                    alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];


function clickPokemon(pokemonNumber) {
    modal.style.display = "block";
    console.log("Esse é o número do Pokémon:", pokemonNumber);
    pokeApi.getOnePokemon(pokemonNumber).then((pokemon = []) => {
        console.log(pokemon);
    })
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}


loadPokemonItens(offset, limit)


loadMore.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMore.parentElement.removeChild(loadMore)

    } else {
        loadPokemonItens(offset, limit)
    }

})

