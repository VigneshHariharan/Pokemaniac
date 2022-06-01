import { useState, useCallback, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPokemonDetailsByName,fetchPokemonEvolutionChainDetails, fetchPokemonSpeciesDetailsByName,fetchAllPokemons, fetchAllPokemonWithDetails } from './pokemonDataHandlers'

export const buildPokemonDetails =  async (pokemonNameKey, pokemonDetailsData, speciesData) => {
  const name =  pokemonDetailsData?.name || "";
  const growthRate = speciesData?.growth_rate?.name || "";
  const ability = pokemonDetailsData?.abilities?.[0]?.ability?.name?.replace("-"," ");
  const captureRate = speciesData?.capture_rate || 0;
  const pokemonDescriptionEntries = speciesData?.flavor_text_entries;
  const habitat = speciesData?.habitat?.name || "";
  const allPokemonsRaw = await fetchAllPokemonWithDetails();
  const allPokemons = await allPokemonsRaw;
  // let evolvedFrom= speciesData?.evolves_from_species?.name;

  const pokemonListData  = allPokemons[pokemonNameKey];
  const pokemonFrontImage = pokemonListData?.sprites?.front_default || "";

  // use the one from all pokemon for stat
  const pokemonTypes = pokemonListData?.types;
  const pokemonStats = pokemonListData?.stats;
  const pokemonSprites = pokemonDetailsData?.sprites;
  const pokemonMoves = pokemonDetailsData?.moves;

  const evolutionChain = [];

  return {
    name, ability,growthRate,pokemonFrontImage,evolutionChain, captureRate,pokemonMoves, pokemonDescriptionEntries, habitat, pokemonTypes, pokemonStats, pokemonSprites
  }
};

const constructPokemonEvolutionData = async (details, result = []) => {

  const evolutionObj = {
      name: details?.species?.name || "",
  };
  const allPokemonsRaw = await fetchAllPokemonWithDetails();
  const allPokemons = await allPokemonsRaw;
  evolutionObj.listDetails = allPokemons[evolutionObj.name];

  if(details?.evolution_details?.length > 0){
    const evolutionDetails = details?.evolution_details[0];
    evolutionObj.levelAt = evolutionDetails?.min_level;
    evolutionObj.trigger = evolutionDetails?.trigger?.name;
    evolutionObj.needsRain = evolutionDetails?.needs_overworld_rain || false;
  }

  result.push(evolutionObj);
  for(let detail of details?.evolves_to) {
    await constructPokemonEvolutionData(detail,result)
  }
}

export const buildEvolutionChainDetails = (details, constructedData) => {
  const evolvedPokemons = [];

  constructPokemonEvolutionData(details, evolvedPokemons)
 
  return { ...constructedData, evolutionChain: evolvedPokemons }
}

export const usePokemonDetails = () => {
  const [pokeDetails, setPokeDetails] = useState(null)
  const [isPokeDetailsLoading, setIsPokeDetailsLoading] = useState(false)
  const [detailsErrorMessage, setDetailsErrorMessage] = useState('')

  const params = useParams()

  //   TODO: LRU cache for details
  // TODO: Error boundary
    // With only one api call -
  // Moves available - move name
  // Abilities - name ,is_hidden
  // stats, with EV - effort
  // sprites
  // types

  // With one api call
  // Pokemon species api - can call along with details api
  // Description
  // Growth rate - medium slow
  // base_happiness: 50;
  // capture_rate: 45;
  // - can get evolution rate after species api
  // locations available

  // with 2 api call
  // Evolution chain

  // Moves list
  // evolution details
  useEffect(function updatePokemonDetails () {
    setIsPokeDetailsLoading(true)
    const pokemonName = params.pokemon

    const getDetails = async () => {
      const pokemonDetailsData = fetchPokemonDetailsByName(pokemonName);
      const pokemonSpeciesDetailsData = fetchPokemonSpeciesDetailsByName(pokemonName);
      const [pokemonDetails, pokeSpecies] = await Promise.all([pokemonDetailsData,pokemonSpeciesDetailsData]);

      const constructedData = await buildPokemonDetails(pokemonName,pokemonDetails.data, pokeSpecies.data)

      setPokeDetails(constructedData);
      setDetailsErrorMessage(pokemonDetails.errorMessage)
      setIsPokeDetailsLoading(false)

      const evolutionChain = await fetchPokemonEvolutionChainDetails(pokeSpecies?.data?.evolution_chain?.url);
    
      if(evolutionChain.data){
        const data = buildEvolutionChainDetails(evolutionChain.data?.chain,constructedData);
        setPokeDetails(data);
      }
      
    }

    getDetails()
  }, [])

  return {
    pokeDetails,
    isPokeDetailsLoading,
    detailsErrorMessage
  }
}
