const API_URL = 'https://pokeapi.co/api/v2'
const fetchAllPokemonWithDetailsKey = 'allPokemonKeys'
const typeKey = 'types'
import allPokemonKeys from '@data/allPokemonKeys.json'
import allMoveKeys from '@data/allMoves.json'

import { setItemInCache, getItemFromCache } from './utils'

export const fetchAllPokemons = async () => {
  const url = `${API_URL}/pokemon?limit=100000&offset=0`

  try {
    const pokemonDataListBlobs = await fetch(url)
    const pokemonDataList = await pokemonDataListBlobs.json()
    return { data: pokemonDataList, errorMessage: '' }
  } catch (err) {
    console.log('Error while running fetchAllPokemons :', err)
    return { data: [], errorMessage: err }
  }
}

export const fetchPokemonDetailsByName = async name => {
  const url = `${API_URL}/pokemon/${name}`

  try {
    const pokemonDetailsBlobs = await fetch(url)
    const pokemonDetails = await pokemonDetailsBlobs.json()

    return { data: pokemonDetails, errorMessage: '' }
  } catch (err) {
    console.log('Error while running fetchPokemonDetailsByName :', err)
    return { data: [], errorMessage: err }
  }
}

export const fetchPokemonSpeciesDetailsByName = async name => {
  const url = `${API_URL}/pokemon-species/${name}`;

  try {
    const pokemonDetailsBlobs = await fetch(url)
    const pokemonDetails = await pokemonDetailsBlobs.json()

    return { data: pokemonDetails, errorMessage: '' }
  } catch (err) {
    console.log('Error while running fetchPokemonSpeciesDetailsByName :', err)
    return { data: [], errorMessage: err }
  }
}

export const fetchAllPokemonWithDetails = async () => {
  // const cachedData = await getItemFromCache(fetchAllPokemonWithDetailsKey);
  // if (cachedData) return cachedData
  const cachedData = await allPokemonKeys
  if (cachedData) return cachedData

  // const pokemonData = await data.json()
  const pokemons = await fetchAllPokemons()
  let pokemonData = pokemons.data.results
  const pokemonNames = pokemonData.map(pokemon => pokemon.name)
  const detailPromises = pokemonNames.map(name =>
    fetchPokemonDetailsByName(name)
  )
  try {
    const allPokemonDetails = await Promise.all(detailPromises)
    setItemInCache(fetchAllPokemonWithDetailsKey, allPokemonDetails)
    return { data: allPokemonDetails.data, error: '' }
  } catch (err) {
    console.log('Error while running fetchAllPokemonWithDetails :', err)
    return { data: [], error: err }
  }
}

export const fetchAllPokemonTypes = async () => {
  const url = `${API_URL}/type`
  const cachedData = await getItemFromCache(typeKey)
  if (cachedData) return cachedData
  try {
    const pokemonTypesData = await fetch(url)
    const pokemonTypesResult = await pokemonTypesData.json();

    const result = pokemonTypesResult.results?.slice(0, 18)

    const response = { data: result, errorMessage: '' }
    setItemInCache(typeKey, response)

    return { data: result, errorMessage: '' }
  } catch (err) {
    console.log('Error at ', url, err)
    return { data: [], errorMessage: err }
  }
}


export const fetchPokemonEvolutionChainDetails = async (url) => {

  try {
    const evolutionDetails = await fetch(url)
    const evolutionResult = await evolutionDetails.json();

    const result = evolutionResult;


    return { data: result, errorMessage: '' }
  } catch (err) {
    console.log('Error at ', url, err)
    return { data: null, errorMessage: err }
  }
}


export const fetchAllPokemonMoves = async () => {

  const moves = await allMoveKeys;
  return moves
};