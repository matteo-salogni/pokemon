let pokemon=[];
function loadPokemon() {
    const savedPokemon = JSON.parse(localStorage.getItem("savedPokemonVisual"));
    if (!savedPokemon) {
        console.error("Nessun Pokémon salvato trovato!");
        return;
    }
    pokemon.push(savedPokemon);
    console.log("Pokémon caricato:", savedPokemon);
}
async function esiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}
async function visualizzaPokemon(){
    document.getElementById('pokemon-image').innerHTML = '';
    document.getElementById('nome-pokemon').innerHTML = '';

    // Mostra l'immagine del Pokémon
    const img = document.createElement('img');
    img.src = pokemon[0].sprites.front_default;
    img.classList.add('cover-image');
    document.getElementById('pokemon-image').appendChild(img);

    // Mostra il nome del Pokémon
    document.getElementById('nome-pokemon').textContent = pokemon[0].forms[0].name;

    const urlOver = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemon[0].forms[0].name}.gif`;

    const hoverImg = document.getElementById('hover-image');
        // const imgPokeball = document.createElement('img');
        // imgPokeball.src = "pokeball.png";
        //hoverImg.src = urlOver; // URL della GIF dinamica
        if (await esiste(urlOver)) {
            hoverImg.src = urlOver;
        } else {
            hoverImg.src = img.src;
        }
}
document.addEventListener("DOMContentLoaded",loadPokemon);
document.addEventListener("DOMContentLoaded", () => {
    visualizzaPokemon();
});