import React from "react";
import PokemonType from "@components/accessories/PokemonType";
import PokeStats from "@components/accessories/PokeStats";
import { usePokemons } from "@hooksAndUtils/usePokemonDataSet";
import { getImageUrlForPokemon } from "@hooksAndUtils/utils";

const PokeListing = () => {
  const {
    isListingLoading,
    handlePokemonDetails,
    pokeListing,
    isPokeDetailsLoading,
    detailsErrorMessage,
    pokeDetails,
    resetToDefaultFilters,
    handleFilters,
  } = usePokemons();

  if (isListingLoading) return <div>Loading</div>;

  return (
    <div className="container">
      <button onClick={() => handleFilters({ type: "fire" })}>fire</button>
      <button onClick={() => handleFilters({ type: "water" })}>water</button>
      <button onClick={() => handleFilters({ type: "electric" })}>
        electric
      </button>
      <button onClick={() => resetToDefaultFilters()}>Reset to default</button>

      <img
        src={"/Pokemaniac/docs" + `/images/pokemons/014Kakuna.png`}
        alt="ma"
      />
      <div className="pokelisting-container">
        {pokeListing.order?.map((pokemonName, index) => {
          const pokemon = pokeListing[pokemonName];
          if (!pokemon || pokemon instanceof Array) {
            return null;
          }
          return (
            <div
              key={pokemon.name}
              className="pokelisting-card-container"

              // onClick={() => handlePokemonDetails(pokemon.name)}
            >
              <h5>{pokemon.name?.toUpperCase()}</h5>
              <img
                src={pokemon?.sprites?.front_default}
                alt={pokemon.name + " image"}
                className="pokemon-front-image"
              />
              <div className="type-container">
                {pokemon.types?.map((typeObj) => (
                  <PokemonType typeObj={typeObj} />
                ))}
              </div>
              <PokeStats stats={pokemon.stats} />
              <div>
                <p>Weight - {pokemon.weight}</p>
                <p>Height - {pokemon.height}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeListing;
