const axios = require("axios");
const fs = require("fs");
const flatten = require('flat');
const { exit } = require("process");
const unflatten = require('flat').unflatten;

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const fetchAllPokemons = async () => {

    const url = `${API_URL}?limit=1000000&offset=0`;

    try {
        const response = await axios.get(url);
        const pokemonDataList = response.data
        return { data: pokemonDataList, errorMessage: '' };
    } catch (err) {
        console.log("Error while running fetchAllPokemons :", err);
        return { data: [], errorMessage: err };
    }

};

const fetchPokemonDetailsByName = async (name) => {
    const url = `${API_URL}/${name}`;

    try {
        const pokemonDetails = await axios.get(url);
        return { data: pokemonDetails.data, errorMessage: '' };
    } catch (err) {
        console.log("Error while running fetchPokemonDetailsByName :", err);

        exit()
        console.log("Error while running fetchPokemonDetailsByName :", err);
        return { data: [], errorMessage: err };
    }
};

const fetchAllPokemonWithDetails = async () => {
    const key = 'allPokemonKeys';

    const pokemons = await fetchAllPokemons();
    let pokemonData = pokemons.data.results;
    const pokemonNames = pokemonData.map((pokemon) => pokemon.name);
    const detailPromises = pokemonNames?.map((name) => fetchPokemonDetailsByName(name));
    try {
        let allPokemonDetails = await Promise.all(detailPromises);
        // const responseStore = await JSON.parse(allPokemonDetails);
        // const flattenedResp = await flatten(responseStore)


        let pokemonOrder = [];
        allPokemonDetails = allPokemonDetails.reduce((result, pokemon, index) => {
            pokemonOrder.push(pokemonNames[index]);
            return ({ ...result, [pokemonNames[index]]: pokemon.data })
        }, {})
        allPokemonDetails.order = pokemonOrder;
        // console.log('all', pokemons, allPokemonDetails)

        const sff = await JSON.stringify(allPokemonDetails);
        fs.writeFileSync(`${key}.json`, sff)
        return { data: allPokemonDetails.data, error: '' }
    } catch (err) {
        console.log("Error while running fetchAllPokemonWithDetails :", err);
        return { data: [], error: err }
    }

}
fetchAllPokemonWithDetails()