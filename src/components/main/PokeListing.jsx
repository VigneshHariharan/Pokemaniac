import { usePokemons } from "@hooksAndUtils/usePokemonDataSet";
import { debounce, PokemonTypesClasses } from "@hooksAndUtils/utils";
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

  const onChange = debounce((event) => {
    const name = event.target.value;
    handleFilters({ name });
  }, 300);
  if (isListingLoading) return <div>Loading</div>;

  return (
    <div>
      <Navbar />
      {!isListingLoading && (
        <div className="container md:px-8 px-4 w-full">
          <div className="my-4">
            <h3 className="text-left">List of all pokemons</h3>
          </div>
          <input placeholder="Search pokemon by name" onChange={onChange} />
          <div className="my-4">
            <h4 className="mb-2 text-left">Filter By Pokemon Types </h4>
            <div className="flex flex-wrap gap-2 outline-none">
              {pokemonTypes &&
                pokemonTypes?.map(({ name }) => {
                  const typeName = name;
                  return (
                    <button
                      key={typeName}
                      className={
                        (typesFiltered?.includes(typeName)
                          ? `!bg-slate-700`
                          : "btn-basic ") + " rounded-sm px-2 border-none "
                      }
                      onClick={() => handleFilters({ type: typeName })}
                    >
                      {typeName}
                    </button>
                  );
                })}
              <button
                className="!bg-slate-600 px-2 border-none"
                onClick={() => resetToDefaultFilters()}
              >
                reset
              </button>
            </div>
          </div>

          {pokeListing?.order?.length === 0 && (
            <div>
              <p>No results</p>
            </div>
          )}

          {/* <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-4"> */}
          <div className="flex flex-wrap gap-2">
            {pokeListing.order?.map((pokemonName, index) => {
              const pokemon = pokeListing[pokemonName];
              if (!pokemon || pokemon instanceof Array) {
                return null;
              }
              return (
                <div
                  className="w-[19rem] sm:w-[19rem] lg:w-[25rem]"
                  key={pokemonName}
                >
                  <PokemonCard
                    pokemon={pokemon}
                    handlePokemonDetails={handlePokemonDetails}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeListing;
