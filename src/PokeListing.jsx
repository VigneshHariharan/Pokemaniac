import React from "react";
import PokemonType from "./PokemonType";
import PokeStats from "./PokeStats";
import { usePokemons } from "./usePokemonDataSet";

const PokeListing = () => {
  const {
    isListingLoading,
    handlePokemonDetails,
    pokeListing,
    isPokeDetailsLoading,
    detailsErrorMessage,
    pokeDetails,
  } = usePokemons();

  console.log("Object.values(pokeListing)", pokeListing.order);

  if (isListingLoading) return <div>Loading</div>;
  return (
    <div className="container">
      <div className="pokelisting-container">
        {pokeListing.order?.map((pokemonName) => {
          const pokemon = pokeListing[pokemonName];
          if (!pokemon || pokemon instanceof Array) {
            return null;
          }
          return (
            <div
              key={pokemon.name || pokemon.sprites?.front_default}
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
