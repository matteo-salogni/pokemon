let pokedex=[];
async function esiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}
function loadPokedex(){
    pokedex = JSON.parse(localStorage.getItem("savedPokemon")) || [];
    console.log("Pokedex caricata:", pokedex);
}
async function visualizzaPokemon() {
    const pokemonContainer = document.getElementById("pokedex-container");
    pokemonContainer.innerHTML = ''; // Pulisci il contenitore

    if (!pokedex || pokedex.length === 0) {
        console.error("Nessun Pokémon da visualizzare!");
        return;
    }

    for (const pokemon of pokedex) {
        try {
            // Crea la card
            const card = document.createElement('div');
            card.classList.add('card');

            // Wrapper per immagine statica e hover
            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');

            const imgPokemon = document.createElement('img');
            imgPokemon.src = pokemon.sprites.front_default;
            imgPokemon.classList.add('pokemon-image');

            const hoverImg = document.createElement('img');
            hoverImg.classList.add('hover-image');
            hoverImg.src="";
            const shinyUrl = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemon.forms[0].name}.gif`;
            hoverImg.src = (await esiste(shinyUrl)) ? shinyUrl : pokemon.sprites.front_default;
            console.log("Visualizzando Pokémon:", pokemon);
            console.log("Immagine statica:", pokemon.sprites.front_default);
            console.log("GIF shiny URL:", shinyUrl);
            console.log("Nome Pokémon:", pokemon.forms[0].name);

            // Aggiungi immagini al wrapper
            wrapper.appendChild(imgPokemon);
            wrapper.appendChild(hoverImg);

            // Nome del Pokémon
            const nomePokemon = document.createElement('p');
            nomePokemon.textContent = pokemon.forms[0].name;
            nomePokemon.classList.add('nome-pokemon');

            // Aggiungi wrapper e nome alla card
            card.appendChild(wrapper);
            card.appendChild(nomePokemon);

            // Aggiungi la card al container
            pokemonContainer.appendChild(card);
            card.addEventListener('click', () => {
                location.href = 'index2.html';
                salvaPokemonNelStorage(pokemon);
            });
        } catch (error) {
            console.error("Errore nella visualizzazione del Pokémon:", pokemon, error);
        }
    }
}
function salvaPokemonNelStorage(pokemon) {
    localStorage.setItem("savedPokemonVisual", JSON.stringify(pokemon));
    console.log("Pokémon salvato:", pokemon);
}

document.addEventListener("DOMContentLoaded",loadPokedex);
document.addEventListener("DOMContentLoaded", () => {
    loadPokedex();
    if (pokedex.length > 0) {
        visualizzaPokemon(); // Visualizza i Pokémon se ce ne sono
    } else {
        console.log("Nessun Pokémon salvato nella Pokedex.");
    }
});

