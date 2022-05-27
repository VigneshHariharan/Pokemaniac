import { useState, useCallback, useEffect, useMemo } from 'react'
import {
  fetchPokemonDetailsByName,
  fetchAllPokemonWithDetails,
  fetchAllPokemonTypes
} from './pokemonDataHandlers'
import { useNavigate } from 'react-router-dom'

export const usePokemons = () => {
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [pokeListing, setPokeListing] = useState([])
  const [pokemonDataResponse, setPokemonDataResponse] = useState([])

  const [listingErrorMessage, setIsListingErrorMessage] = useState('')
  const [typesFiltered, setTypesFiltered] = useState([])
  const [pokemonTypes, setPokemonTypes] = useState([])
  const navigate = useNavigate()

  const handlePokemonDetails = useCallback(name => {
    navigate('/Pokemaniac/' + name)
  }, [])

  // Only AND filters
  const handleFilters = useCallback(
    ({ type }) => {
      const newFilterTypes = [...typesFiltered]
      const currentPosOfType = newFilterTypes?.findIndex(
        existType => existType === type
      )
      if (currentPosOfType > -1) {
        newFilterTypes.splice(currentPosOfType, 1)
      } else {
        newFilterTypes.push(type)
      }
      setTypesFiltered(newFilterTypes)

      // const newPokeListings = Object.entries(pokeListing).reduce((result, [pokemonKey, pokemon]) => {
      //     console.log('oke', pokemon, newFilterTypes)
      //     if (!pokemon.types) return { ...result, order: pokemon };
      //     for (let typeName of pokemon?.types) {
      //         if (newFilterTypes.includes(typeName)) {
      //             return { ...result, [pokemonKey]: pokemon }
      //         }
      //     }
      //     return result
      // }, {});

      const newPokeListingsOrder = pokemonDataResponse.order?.filter(
        pokemonName => {
          if (newFilterTypes?.length === 0) return true
          const pokemon = pokeListing[pokemonName]
          for (let typeName of pokemon?.types) {
            if (newFilterTypes.includes(typeName)) {
              // return { ...result, [pokemonKey]: pokemon }
              return true
            }
          }
          return false
        }
      )
      const newPokeListings = { ...pokeListing, order: newPokeListingsOrder }
      setPokeListing(newPokeListings)
    },
    [typesFiltered, pokeListing]
  )

  const resetToDefaultFilters = () => {
    setPokeListing(pokemonDataResponse)
  }

  useEffect(function getPokemonListingData () {
    setIsDataLoading(true)
    const getData = async () => {
      const [pokemons, pokemonTypesData] = await Promise.all([
        await fetchAllPokemonWithDetails(),
        await fetchAllPokemonTypes()
      ])
      setIsDataLoading(false)
      setPokeListing(pokemons)
      setPokemonDataResponse(pokemons)
      setIsListingErrorMessage(pokemons.errorMessage)
      setPokemonTypes(pokemonTypesData.data)
      // for other data
      // const firstDefaultData = pokemons?.data?.results[0];
      // handlePokemonDetails(firstDefaultData?.name)
    }
    getData()
  }, [])

  return {
    isListingLoading: isDataLoading,
    pokeListing,
    typesFiltered,
    pokemonTypes,
    listingErrorMessage,
    handlePokemonDetails,
    resetToDefaultFilters,
    handleFilters
  }
}
