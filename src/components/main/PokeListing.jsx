import { usePokemons } from "@hooksAndUtils/usePokemonDataSet";
import { Navbar } from "@components/common";
import PokemonCard from "@components/accessories/PokemonCard";

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
      <div className="container md:px-8 px-4 w-full">
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
          <h2>List of all pokemons</h2>
        </div>
        <div className="flex flex-row flex-wrap justify-center lg:flex-wrap sm:items-center  mt-8">
          {pokeListing.order?.map((pokemonName, index) => {
            const pokemon = pokeListing[pokemonName];
            if (!pokemon || pokemon instanceof Array) {
              return null;
            }
            return (
              <PokemonCard
                key={pokemonName}
                pokemon={pokemon}
                handlePokemonDetails={handlePokemonDetails}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokeListing;
