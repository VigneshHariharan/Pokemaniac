const API_URL = "https://pokeapi.co/api/v2/pokemon";
const fetchAllPokemonWithDetailsKey = 'allPokemonKeys';
import allPokemonKeys from '@data/allPokemonKeys.json'

const setItemInCache = (key, value) => {

    // if (!localStorage.getItem(key)) {
    //     localStorage.setItem(key, JSON.stringify(value))
    // }
};

const getItemFromCache = async (key) => {
    // const data = await fetch('src/data/allPokemonKeys.json')
    const pokemonData = await allPokemonKeys;
    // const pokemonData = await data.json()
    return pokemonData || null;
    // if (localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key));
    // return null;
};

export const fetchAllPokemons = async () => {

    const url = `${API_URL}?limit=100000&offset=0`;

    try {
        const pokemonDataListBlobs = await fetch(url);
        const pokemonDataList = await pokemonDataListBlobs.json();
        return { data: pokemonDataList, errorMessage: '' };
    } catch (err) {
        console.log("Error while running fetchAllPokemons :", err);
        return { data: [], errorMessage: err };
    }

};

export const fetchPokemonDetailsByName = async (name) => {
    const url = `${API_URL}/${name}`;

    try {
        const pokemonDetailsBlobs = await fetch(url);
        const pokemonDetails = await pokemonDetailsBlobs.json();

        return { data: pokemonDetails, errorMessage: '' };
    } catch (err) {
        console.log("Error while running fetchPokemonDetailsByName :", err);
        return { data: [], errorMessage: err };
    }
};

export const fetchAllPokemonWithDetails = async () => {
    const cachedData = await getItemFromCache(fetchAllPokemonWithDetailsKey);
    if (cachedData) return cachedData
    const pokemons = await fetchAllPokemons();
    let pokemonData = pokemons.data.results;
    const pokemonNames = pokemonData.map((pokemon) => pokemon.name);
    const detailPromises = pokemonNames.map((name) => fetchPokemonDetailsByName(name));
    try {
        const allPokemonDetails = await Promise.all(detailPromises);
        setItemInCache(fetchAllPokemonWithDetailsKey, allPokemonDetails);
        return { data: allPokemonDetails.data, error: '' };
    } catch (err) {
        console.log("Error while running fetchAllPokemonWithDetails :", err);
        return { data: [], error: err }
    }

}
