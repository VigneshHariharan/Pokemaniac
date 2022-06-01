import { usePokemonDetails } from "@hooksAndUtils/usePokemonDetails";
// import { use } from "react-router-dom";
import { Navbar } from "@components/common";
import { usePokemonTeam } from "@hooksAndUtils/usePokemonTeam";
import { usePokemons } from "@hooksAndUtils/usePokemonDataSet";
import { Link } from "react-router-dom";
import {
  PokeStats,
  PokemonType,
  PokemonDescription,
  PokemonSpritiesLayout,
  PokemonMoves,
  EvolutionChain,
} from "@components/accessories";

const PokemonDetails = () => {
  const { addPokemonToTeam, pokeTeam, teams } = usePokemonTeam();
  const { pokeListing } = usePokemons();
  const { pokeDetails, isPokeDetailsLoading, detailsErrorMessage } =
    usePokemonDetails();

  return (
    <div>
      <Navbar />
      {isPokeDetailsLoading && <div>Loading</div>}
      {!isPokeDetailsLoading && (
        <div className="container">
          <div className="flex">
            <h2>{pokeDetails?.name || ""}</h2>

            <img
              src={pokeDetails?.pokemonFrontImage || "images/pokeball.svg"}
              alt={pokeDetails?.name + " image"}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            {teams.teamOrder.length === 0 && (
              <button>
                <Link to={"/Pokemaniac/teams"}>Create team</Link>
              </button>
            )}
            {teams.teamOrder.map((teamId) => {
              const team = teams.teams[teamId];
              return (
                <div key={teamId}>
                  <button
                    onClick={() =>
                      addPokemonToTeam(pokeListing[pokeDetails?.name], teamId)
                    }
                  >
                    Add pokemon to this {team.teamName} team
                  </button>
                </div>
              );
            })}
          </div>
          <div>
            <p>{pokeDetails?.growthRate}</p>
            <p>{pokeDetails?.ability?.toUpperCase()}</p>
          </div>
          <PokemonSpritiesLayout
            sprities={pokeDetails?.pokemonSprites}
            pokemonName={pokeDetails?.name}
          />
          <EvolutionChain evolutionDetails={pokeDetails?.evolutionChain} />
          <PokemonMoves moves={pokeDetails?.pokemonMoves} />
          <PokeStats stats={pokeDetails?.pokemonStats} isDetailed />
          {pokeDetails?.pokemonTypes?.map((typeObj) => (
            <PokemonType typeObj={typeObj} key={typeObj} />
          ))}

          <PokemonDescription
            descriptions={pokeDetails?.pokemonDescriptionEntries || []}
          ></PokemonDescription>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
