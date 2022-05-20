import { useState } from "react";
import PokemonType from "@components/accessories/PokemonType";
import PokeStats from "@components/accessories/PokeStats";
import { usePokemons } from "@hooksAndUtils/usePokemonDataSet";
import { getImageUrlForPokemon } from "@hooksAndUtils/utils";
import { Navbar } from "@components/common";

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
    pokemonTypes,
    typesFiltered,
  } = usePokemons();

  if (isListingLoading) return <div>Loading</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        {/* <div className="pokelisting-types-listing">
        {pokemonTypes &&
          pokemonTypes?.map(({ name }) => (
            <button
              key={name}
              className={
                typesFiltered?.includes(name) ? "btn-primary" : "btn-basic"
              }
              onClick={() => handleFilters({ type: name })}
            >
              {name}
            </button>
          ))}
      </div> */}
        {/* <button onClick={() => resetToDefaultFilters()}>Reset to default</button> */}

        <div>
          <h2 className="inline">List of all pokemons</h2>
        </div>
        <div className="flex flex-wrap gap-4 mt-8 mx-auto justify-between w-full ">
          {pokeListing.order?.map((pokemonName, index) => {
            const pokemon = pokeListing[pokemonName];
            if (!pokemon || pokemon instanceof Array) {
              return null;
            }
            return (
              <div
                key={pokemonName}
                className="cursor-pointer px-8 py-4 rounded-sm transition-all ease-in-out delay-2  hover:bg-slate-100 hover:dark:bg-slate-800"
                onClick={() => handlePokemonDetails(pokemon.name)}
              >
                <h5>{pokemon.name?.toUpperCase()}</h5>
                <img
                  src={pokemon?.sprites?.front_default || "images/pokeball.svg"}
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
                  <p>Weight - {pokemon.weight} kg</p>
                  <p>Height - {pokemon.height} inches</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeListing;
