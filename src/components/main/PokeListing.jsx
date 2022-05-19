import { useState } from "react";
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
  const [selectTeamMode, setSelectTeamMode] = useState(true);

  if (isListingLoading) return <div>Loading</div>;

  return (
    <div className="container">
      <div>
        <button onClick={() => setSelectTeamMode(!selectTeamMode)}>
          Switch to select mode
        </button>
      </div>
      <button onClick={() => handleFilters({ type: "fire" })}>fire</button>
      <button onClick={() => handleFilters({ type: "water" })}>water</button>
      <button onClick={() => handleFilters({ type: "electric" })}>
        electric
      </button>
      <button onClick={() => resetToDefaultFilters()}>Reset to default</button>
      {selectTeamMode ? (
        <div className="pokelisting-container">
          {pokeListing.order?.map((pokemonName, index) => {
            const pokemon = pokeListing[pokemonName];
            if (!pokemon || pokemon instanceof Array) {
              return null;
            }
            return (
              <div
                key={pokemon.order}
                className="pokelisting-card-container"

                // onClick={() => handlePokemonDetails(pokemon.name)}
              >
                <h5>{pokemon.name?.toUpperCase()}</h5>
                <img
                  src={
                    pokemon?.sprites?.front_default ||
                    "/public/images/pokeball.svg"
                  }
                  alt={pokemon.name + " image"}
                  className="pokemon-front-image"
                />
                <div className="type-container">
                  {pokemon.types?.map((typeObj) => (
                    <PokemonType typeObj={typeObj} key={typeObj} />
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
      ) : (
        <div>Select team</div>
      )}
    </div>
  );
};

export default PokeListing;
