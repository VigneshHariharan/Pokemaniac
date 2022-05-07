import { useState, useCallback, useEffect, useMemo } from 'react';
import { fetchAllPokemons, fetchPokemonDetailsByName, fetchAllPokemonWithDetails } from './pokemonDataHandlers';


export const usePokemons = () => {

    const [isDataLoading, setIsDataLoading] = useState(false);
    const [pokeListing, setPokeListing] = useState([]);
    const [pokemonDataResponse, setPokemonDataResponse] = useState([]);
    const [pokeDetails, setPokeDetails] = useState(null);
    const [isPokeDetailsLoading, setIsPokeDetailsLoading] = useState(false);

    const [listingErrorMessage, setIsListingErrorMessage] = useState("");
    const [detailsErrorMessage, setDetailsErrorMessage] = useState("")
    const [typesFiltered, setTypesFiltered] = useState([]);

    const handlePokemonDetails = useCallback((name) => {
        setIsPokeDetailsLoading(true);

        const getDetails = async () => {
            const pokemonDetails = await fetchPokemonDetailsByName(name);
            setPokeDetails(pokemonDetails.data);
            setDetailsErrorMessage(pokemonDetails.errorMessage);
            setIsPokeDetailsLoading(false);
        };

        getDetails()

    }, []);

    // Only AND filters
    const handleFilters = useCallback(({ type }) => {
        const newFilterTypes = [...typesFiltered];
        const currentPosOfType = newFilterTypes?.findIndex((existType) => existType === type);
        if (currentPosOfType > -1) {
            newFilterTypes.splice(currentPosOfType, 1);
        } else {
            newFilterTypes.push(type)
        };
        setTypesFiltered(newFilterTypes);
        console.log('newFilteredTypes', newFilterTypes, pokeListing, Object.entries(pokeListing))
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


        const newPokeListingsOrder = pokemonDataResponse.order?.filter((pokemonName) => {
            if (newFilterTypes?.length === 0) return true;
            const pokemon = pokeListing[pokemonName];
            for (let typeName of pokemon?.types) {
                if (newFilterTypes.includes(typeName)) {
                    // return { ...result, [pokemonKey]: pokemon }
                    return true;
                }
            };
            return false
        });
        const newPokeListings = { ...pokeListing, order: newPokeListingsOrder }
        console.log('newPoke', newPokeListings);
        setPokeListing(newPokeListings)
    }, [typesFiltered, pokeListing]);

    const resetToDefaultFilters = () => {
        setPokeListing(pokemonDataResponse)
    }

    useEffect(function getPokemonListingData() {
        setIsDataLoading(true);
        const getData = async () => {
            const pokemons = await fetchAllPokemonWithDetails();
            setIsDataLoading(false);
            console.log("Pokemons : ", pokemons)
            setPokeListing(pokemons);
            setPokemonDataResponse(pokemons);
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
        detailsErrorMessage, handlePokemonDetails,
        resetToDefaultFilters, handleFilters
    };
}