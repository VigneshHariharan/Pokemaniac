import { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchAllPokemons, fetchPokemonDetailsByName, fetchAllPokemonWithDetails } from './pokemonDataHandlers';

export const usePokemons = () => {

    const [isDataLoading, setIsDataLoading] = useState(false);
    const [pokeListing, setPokeListing] = useState([]);
    const [pokeDetails, setPokeDetails] = useState(null);
    const [isPokeDetailsLoading, setIsPokeDetailsLoading] = useState(false);

    const [listingErrorMessage, setIsListingErrorMessage] = useState("");
    const [detailsErrorMessage, setDetailsErrorMessage] = useState("")


    const handlePokemonDetails = useCallback((name) => {
        setIsPokeDetailsLoading(true);

        const getDetails = async () => {
            const pokemonDetails = await fetchPokemonDetailsByName(name);
            setPokeDetails(pokemonDetails.data);
            setDetailsErrorMessage(pokemonDetails.errorMessage);
            setIsPokeDetailsLoading(false);
        };

        getDetails()

    }, [])

    useEffect(function getPokemonListingData() {
        setIsDataLoading(true);
        const getData = async () => {
            const pokemons = await fetchAllPokemonWithDetails();
            setIsDataLoading(false);
            console.log("Pokemons : ", pokemons)
            setPokeListing(pokemons);
            setIsListingErrorMessage(pokemons.errorMessage);
            // for other data
            // const firstDefaultData = pokemons?.data?.results[0];
            // handlePokemonDetails(firstDefaultData?.name)
        }
        getData();

    }, []);

    return {
        isListingLoading: isDataLoading, pokeListing,
        pokeDetails, isPokeDetailsLoading, listingErrorMessage,
        detailsErrorMessage, handlePokemonDetails
    };
}