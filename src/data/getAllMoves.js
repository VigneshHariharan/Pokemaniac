const axios = require("axios");
const fs = require("fs");
const flatten = require('flat');
const { exit } = require("process");
const unflatten = require('flat').unflatten;

const API_URL = "https://pokeapi.co/api/v2/move";
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

const avUrls = [];
const fetchPokemonDetailsByName = async (name, count) => {

    const url = `${API_URL}/${name}`;

    if (avUrls.includes(url)) {
        console.log("Exists ", avUrls, url);
        process.exit();
    } else {
        avUrls.push(url)
    }

  
    await new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve();
        },count * 100)
    });

    try {
        const pokemonDetails = await axios.get(url);
        return { data: pokemonDetails.data, errorMessage: '' };
    } catch (err) {
        console.log("Error while running fetchPokemonDetailsByName :", url, err);
        exit();
        console.log("Error while running fetchPokemonDetailsByName :", err);
        return { data: [], errorMessage: err };
    }
};

const fetchAllPokemonWithDetails = async () => {
    const key = 'allMoves';

    const pokemons = await fetchAllPokemons();
    let pokemonData = pokemons.data.results;
    const pokemonNames = pokemonData.map((pokemon) => pokemon.name);
    // const detailPromises = pokemonNames?.map((name) => fetchPokemonDetailsByName(name));
    try {
        // let allPokemonDetails = await Promise.all(detailPromises);
        let allPokemonDetails = [];

        let count = 0;
        for (let name of pokemonNames) {
                let detail = fetchPokemonDetailsByName(name,count);
                allPokemonDetails.push(detail);
                count++;
        };
         
        allPokemonDetails = await Promise.all(allPokemonDetails);

        // const responseStore = await JSON.parse(allPokemonDetails);
        // const flattenedResp = await flatten(responseStore)


        let pokemonOrder = [];
        allPokemonDetails = allPokemonDetails.reduce((result, pokemon, index) => {
            pokemonOrder.push(pokemonNames[index]);
            const pokemonData = pokemon.data;
        
            return ({
                ...result, [pokemonNames[index]]: {
                    // name: pokemonData.name,
                    power:pokemonData.power,
                    accuracy:pokemonData.accuracy,
                    effectChance:pokemonData.effect_chance,
                    effectEntries: pokemonData?.effect_entries?.[0]?.short_effect,
                    effectChanges: pokemonData?.effect_changes?.[0] || '',
                    pp:pokemonData.pp,
                    priority: pokemonData.priority,
                    damageClass: pokemonData?.damage_class?.name,
                    type: pokemonData?.type?.name,
                    target: pokemonData?.target?.name,
                    title: pokemonData?.names.find((target) => target.language?.name === 'en')?.name
                }
            })
        }, {})
        allPokemonDetails.order = pokemonOrder;
        // console.log('all', pokemons, allPokemonDetails)

        const sff = await JSON.stringify(allPokemonDetails);
        fs.writeFileSync(`${key}.json`, sff)
        console.info("data fetched for you")
        return { data: allPokemonDetails.data, error: '' }
    } catch (err) {
        console.log("Error while running fetchAllPokemonWithDetails :", err);
        return { data: [], error: err }
    }

}
fetchAllPokemonWithDetails()