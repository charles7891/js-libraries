// Wait until page loads
document.addEventListener("DOMContentLoaded", () => {

    // Initialize Glide
    new Glide('.glide', {
        type: 'carousel',
        perView: 3
    }).mount();

    // Initialize AOS
    AOS.init();

    // Cleave.js formatting
    new Cleave('#pokemonInput', {
        blocks: [20],
        uppercase: true
    });

    // Button click event
    document.getElementById("searchBtn").addEventListener("click", searchPokemon);
});


async function searchPokemon() {
    const name = document.getElementById("pokemonInput").value.toLowerCase().trim();
    if (!name) return;

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("No Pokémon found");
        }

        const data = await response.json();
        displayPokemon(data);

    } catch (error) {
        document.getElementById("results").innerHTML =
            `<p style="color:red;">${error.message}</p>`;
    }
}


function displayPokemon(pokemon) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const imgUrl = pokemon.sprites.front_default;
    const name = pokemon.name;
    const types = pokemon.types.map(t => t.type.name).join(", ");
    const height = pokemon.height;
    const weight = pokemon.weight;

    resultsDiv.innerHTML = `
        <div class="card" data-aos="fade-up">
            <a href="${imgUrl}" data-lightbox="pokemon">
                <img src="${imgUrl}">
            </a>
            <h3>${name.toUpperCase()}</h3>
            <p><strong>Type:</strong> ${types}</p>
            <p><strong>Height:</strong> ${height}</p>
            <p><strong>Weight:</strong> ${weight}</p>
        </div>
    `;

    AOS.refresh();
}

