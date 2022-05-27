import { Navbar } from "@components/common";
import { usePokemonTeam } from "@hooksAndUtils/usePokemonTeam";

const PokeTeam = () => {
  const { teams, deletePokemonFromTeam } = usePokemonTeam();
  console.log("tea", teams);
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Your teams</h1>
        {teams.teamOrder.map((teamId) => {
          const pokemonTeam = teams.teams[teamId].team;

          return (
            <div key={teamId} className="flex flex-wrap gap-2">
              {pokemonTeam.map((pokemon) => (
                <div key={pokemon.name}>
                  <h2>{pokemon.name}</h2>
                  <button
                    onClick={() => deletePokemonFromTeam(pokemon.id, teamId)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeTeam;
