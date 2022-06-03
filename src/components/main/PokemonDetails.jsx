import { usePokemonDetails } from "@hooksAndUtils/usePokemonDetails";
// import { use } from "react-router-dom";
import { Navbar } from "@components/common";
import { usePokemonTeam } from "@hooksAndUtils/usePokemonTeam";
import {
  PokeStats,
  PokemonType,
  PokemonMoves,
  EvolutionChain,
} from "@components/accessories";

const PokemonDetails = () => {
  const { addPokemonToTeam, pokeTeam, teams } = usePokemonTeam();
  const { pokeDetails, isPokeDetailsLoading, detailsErrorMessage } =
    usePokemonDetails();

  return (
    <div>
      <Navbar />
      {isPokeDetailsLoading && <div>Loading</div>}
      {!isPokeDetailsLoading && (
        <div className="container px-4 pt-4">
          <div className="flex items-center flex-wrap gap-x-12 mb-8">
            <div className="flex flex-col items-center pb-4 mx-auto">
              {!!pokeDetails?.pokemonFrontImage && (
                <img
                  src={pokeDetails?.pokemonFrontImage}
                  alt={pokeDetails?.name + " image"}
                  className="w-48 mx-auto"
                />
              )}

              <div className="flex flex-wrap gap-2 items-center mb-1">
                <h2>{pokeDetails?.name?.toUpperCase() || ""} </h2>
                {pokeDetails?.pokemonTypes?.map((typeObj) => (
                  <PokemonType typeObj={typeObj} key={typeObj} />
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2 items-center">
                <p className="capitalize  dark:text-slate-300">
                  Growth Rate: {pokeDetails?.growthRate}
                </p>
                <p className="capitalize  dark:text-slate-300">
                  Ability: {pokeDetails?.ability}
                </p>
              </div>
            </div>

            <div className="w-[400px]">
              <PokeStats stats={pokeDetails?.pokemonStats} isDetailed />
            </div>
          </div>
          {/* <div className="flex flex-col gap-y-2 mb-4">
            <button className="btn-primary w-80 mx-auto dark:border-none dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:focus:bg-indigo-500 rounded-sm ">
              ADD POKEMON TO A TEAM +
            </button>
            {teams.teamOrder.length === 0 && (
              <button>
                <Link to={"/Pokemaniac/teams"}>Create team</Link>
              </button>
            )}

            <div className="flex gap-2 justify-center">
              {teams.teamOrder.map((teamId) => {
                const team = teams.teams[teamId];
                return (
                  <div key={teamId}>
                    <button
                      onClick={() =>
                        addPokemonToTeam(pokeListing[pokeDetails?.name], teamId)
                      }
                    >
                      {team.teamName}
                    </button>
                  </div>
                );
              })}
            </div>
          </div> */}

          {/* <PokemonSpritiesLayout
            sprities={pokeDetails?.pokemonSprites}
            pokemonName={pokeDetails?.name}
          /> */}
          <EvolutionChain evolutionDetails={pokeDetails?.evolutionChain} />
          <PokemonMoves moves={pokeDetails?.pokemonMoves} />

          {/* <PokemonDescription
            descriptions={pokeDetails?.pokemonDescriptionEntries || []}
          ></PokemonDescription> */}
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
