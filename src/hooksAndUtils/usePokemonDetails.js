import { useState, useCallback, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPokemonDetailsByName } from './pokemonDataHandlers'

export const usePokemonDetails = () => {
  const [pokeDetails, setPokeDetails] = useState(null)
  const [isPokeDetailsLoading, setIsPokeDetailsLoading] = useState(false)
  const [detailsErrorMessage, setDetailsErrorMessage] = useState('')

  const params = useParams()

  //   TODO: LRU cache for details
  // TODO: Error boundary
  useEffect(function updatePokemonDetails () {
    setIsPokeDetailsLoading(true)

    const getDetails = async () => {
      const pokemonDetails = await fetchPokemonDetailsByName(params.pokemon)
      setPokeDetails(pokemonDetails.data)
      setDetailsErrorMessage(pokemonDetails.errorMessage)
      setIsPokeDetailsLoading(false)
    }

    getDetails()
  }, [])

  return {
    pokeDetails,
    isPokeDetailsLoading,
    detailsErrorMessage
  }
}
