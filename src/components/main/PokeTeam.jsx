import { useRef, useState } from "react";
import { Navbar } from "@components/common";
import { usePokemonTeam } from "@hooksAndUtils/usePokemonTeam";
import PokemonCard from "@components/accessories/PokemonCard";
import { usePokemons } from "@hooksAndUtils/usePokemonDataSet";

const PokeTeam = () => {
  const { teams, deletePokemonFromTeam, createTeam, deleteTeam } =
    usePokemonTeam();
  const { handlePokemonDetails } = usePokemons();
  const pokeRef = useRef(null);
  const [captionForTeamName, setCaptionForTeamName] = useState("");

  const addTeam = () => {
    const name = pokeRef.current?.value || "";
    if (name) {
      const isTeamNameAvailable = Object.values(teams.teams).find(
        (pok) => pok.teamName === name
      );
      if (isTeamNameAvailable) {
        setCaptionForTeamName("team name already available");
        return;
      }

      createTeam(name);
      pokeRef.current.value = "";
    } else {
      setCaptionForTeamName("enter team name to add");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Your teams</h1>
        <div>
          <div>
            <label for="team-name-form">Enter team name</label>
            <input
              id="team-name-form"
              type="text"
              ref={pokeRef}
              placeholder="team name like Gen 1, Fire tyeps"
            />
            <p className="text-red-700 dark:text-red-300">
              {captionForTeamName}
            </p>
          </div>
          <button onClick={addTeam}>Submit</button>
        </div>

        {teams.teamOrder.map((teamId) => {
          const pokemonTeam = teams.teams[teamId].team;

          return (
            <div key={teamId}>
              <div className="my-4 flex py-1 gap-2 items-center">
                <h2>{teams.teams[teamId].teamName || "Team name"}</h2>
                <button onClick={() => deleteTeam(teamId)}>D</button>
              </div>
              <div className="grid grid-cols-3">
                {pokemonTeam.map((pokemon) => (
                  <div
                    key={pokemon.name}
                    className="w-max flex items-center gap-2"
                  >
                    <button
                      onClick={() => deletePokemonFromTeam(pokemon.id, teamId)}
                    >
                      D
                    </button>

                    <PokemonCard
                      key={pokemon.name}
                      pokemon={pokemon}
                      handlePokemonDetails={handlePokemonDetails}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeTeam;
