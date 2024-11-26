//da 1 a 1025, da 10001 a 10277
//zekrom 644
const pokemonInfo=[]; 
function getRandomPokemonId() {
    return Math.floor(Math.random() * 1302) + 1;
}

function timeAlive () {
    return Math.floor(Math.random() * (8000 - 7000 + 1)) + 7000;
}

function timeNotAlive() {
    return Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;
}

async function esiste(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function fetchPokemonImage(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokemonId}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Qualcosa non va');
        }
        const pokemonResult = await response.json();
        const pokemonInfoUrl = pokemonResult.results[0].url;
        const pokemonInfoResponse = await fetch(pokemonInfoUrl);
        const data = await pokemonInfoResponse.json();
        pokemonInfo.pop();
        pokemonInfo.push(data);
        const imgPokeball = document.createElement('img');
        imgPokeball.src = "pokeball.png";
        const pokemonName = data.forms[0].name;
        const urlOver = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemonName}.gif`;

        //console.log("URL GIF:", urlOver);

        const frontImageUrl = data.sprites.front_default;
        const img = document.createElement('img');
        img.src = frontImageUrl;
        img.classList.add('cover-image');
        const hoverImg = document.getElementById('hover-image');
        // const imgPokeball = document.createElement('img');
        // imgPokeball.src = "pokeball.png";
        //hoverImg.src = urlOver; // URL della GIF dinamica
        if (await esiste(urlOver)) {
            hoverImg.src = urlOver;
        } else {
            hoverImg.src = frontImageUrl;
        }

        document.getElementById('pokemon-image').appendChild(img);
        document.getElementById('nome-pokemon').textContent = data.forms[0].name;
        document.getElementById('pokeball').appendChild(imgPokeball);

    } catch (error) {
        console.error('Errore nella fetch:', error);
    }
}



// function startLoop() {
//     setInterval(() => {
//         const randomPokemonId = getRandomPokemonId();
//         fetchPokemonImage(randomPokemonId);
//     }, 5000);
// }
let running = true;
function startLoop() {
    if(running) {
        loop()
    }
}

// function fermaButton() {
//     if(running){
//     running = false;

//     document.getElementById('pokemon-image').innerHTML = '';
//     document.getElementById('hover-image').innerHTML = '';
//     document.getElementById('pokeball').innerHTML = '';
    
//     const lastPokemon = pokedex[pokedex.length-1];

//     // Mostra l'immagine del Pokémon
//     const img = document.createElement('img');
//     img.src = lastPokemon.sprites.front_default;
//     img.classList.add('cover-image');
//     document.getElementById('pokemon-image').appendChild(img);

//     // Mostra il nome del Pokémon
//     document.getElementById('nome-pokemon').textContent = lastPokemon.forms[0].name;

//     // Gestisci la GIF per l'hover effect
//     const hoverImg = document.getElementById('hover-image');
//     const gifUrl = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${lastPokemon.forms[0].name}.gif`;

//     esiste(gifUrl).then((exists) => {
//         hoverImg.src = exists ? gifUrl : lastPokemon.sprites.front_default;
//     });

//     visualizzaPokemon();
//     document.getElementById('pokedex-container').style.display = 'flex';
//     }
    
// }

// function avviaButton() {
//     if(!running){
//     running = true;    
//     document.getElementById('pokedex-pokemon-image').innerHTML = '';
//     document.getElementById('pokedex-nome-pokemon').innerHTML = '';
//     document.getElementById('pokemon-image').innerHTML = '';
//     document.getElementById('hover-image').innerHTML = '';
//     // document.getElementById('nome-pokemon').innerHTML = '';
//     document.getElementById('pokeball').innerHTML = '';
//     //document.getElementById('pokeball2').innerHTML = '';
//     //document.getElementById('home').innerHTML = '';
//     loop();
//     }
// }

async function loop() {

    const randomPokemonId = getRandomPokemonId();
    await fetchPokemonImage(randomPokemonId);
    setTimeout(() => {
        document.getElementById('pokemon-image').innerHTML = '';
        document.getElementById('nome-pokemon').innerHTML = '';
        document.getElementById('pokeball').innerHTML = '';
        document.querySelector('.card').classList.add('hidden');
        setTimeout(startLoop, timeNotAlive());
    }, timeAlive());
}

startLoop();

let pokedex=[];
function loadPokedex(){
    pokedex = JSON.parse(localStorage.getItem("savedPokemon")) || [];
}
function clearPokedex() {
    localStorage.removeItem("savedPokemon");
    pokedex = [];
    console.log("Pokedex eliminata con successo!");
}
function catchPokemon(){
    const giaCatturato = pokedex.some(pokemon => pokemon.forms[0].name === pokemonInfo[0].forms[0].name);
    
    if (giaCatturato) {
        // alert(`${pokemonInfo[0].name} è già stato catturato!`);
        return;
    }
    pokedex.push(pokemonInfo[0]);
    localStorage.setItem("savedPokemon",JSON.stringify(pokedex));
    console.log("Pokémon salvato:", pokemonInfo[0]);
    //visualizzaPokemon();
    // localStorage.clear("savedPokemon");
}

function mostraPokemonInCard(pokemon) {
    // Pulisci la card principale
    document.getElementById('pokemon-image').innerHTML = '';
    document.getElementById('nome-pokemon').innerHTML = '';
    document.getElementById('pokeball').innerHTML = '';

    // Mostra l'immagine del Pokémon
    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.classList.add('cover-image');
    document.getElementById('pokemon-image').appendChild(img);

    // Mostra il nome del Pokémon
    document.getElementById('nome-pokemon').textContent = pokemon.forms[0].name;

    // Gestisci la GIF per l'hover effect
    const hoverImg = document.getElementById('hover-image');
    const gifUrl = `https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/${pokemon.forms[0].name}.gif`;

    esiste(gifUrl).then((exists) => {
        hoverImg.src = exists ? gifUrl : pokemon.sprites.front_default;
    });
}
// function salvaNomi(){
//     localStorage.setItem("nomiSalvati", JSON.stringify(nomi));
//     alert("Nomi salvati con successo");
// }
// function visualizzaPokemon() {
//     const pokemonImageContainer = document.getElementById("pokedex-pokemon-image");
//     const pokemonNameContainer = document.getElementById("pokedex-nome-pokemon");
    
//     pokemonImageContainer.innerHTML = '';
//     pokemonNameContainer.innerHTML = '';
//     pokedex.forEach(pokemon => {
//         const imgPokemon = document.createElement("img");
//         imgPokemon.src = pokemon.sprites.front_default;
//         const nomePokemon = document.createElement("p");
//         nomePokemon.textContent = pokemon.forms[0].name;
//         pokemonImageContainer.appendChild(imgPokemon);
//         pokemonNameContainer.appendChild(nomePokemon);
//     });
// }
function visualizzaPokemon() {
    const pokemonImageContainer = document.getElementById("pokedex-pokemon-image");
    // const pokemonNameContainer = document.getElementById("pokedex-nome-pokemon");

    pokemonImageContainer.innerHTML = '';
    // pokemonNameContainer.innerHTML = '';
    pokedex.forEach(pokemon => {
        // Crea l'immagine del Pokémon
        const imgPokemon = document.createElement("img");
        imgPokemon.src = pokemon.sprites.front_default;
        imgPokemon.classList.add('pokedex-image'); // Aggiungi una classe per lo stile

        // Aggiungi un listener al clic
        imgPokemon.addEventListener('click', () => mostraPokemonInCard(pokemon));

        // Crea il nome del Pokémon
        // const nomePokemon = document.createElement("p");
        // nomePokemon.textContent = pokemon.forms[0].name;

        // Aggiungi gli elementi al container
        pokemonImageContainer.appendChild(imgPokemon);
        // pokemonNameContainer.appendChild(nomePokemon);
    });
}
document.getElementById("pokeball").addEventListener("click",catchPokemon);
document.addEventListener("DOMContentLoaded",loadPokedex);
document.addEventListener("DOMContentLoaded", () => {
    loadPokedex();
    //visualizzaPokemon();
});



// const randomPokemonId = getRandomPokemonId();
// fetchPokemonImage(randomPokemonId);          