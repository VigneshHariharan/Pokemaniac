import PokemonType from "@components/accessories/PokemonType";
import PokeStats from "@components/accessories/PokeStats";

const PokemonCard = (props) => {
  const { pokemon, handlePokemonDetails } = props;
  return (
    <div
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
        <p>Weight - {pokemon.weight} g</p>
        <p>Height - {pokemon.height} inches</p>
      </div>
    </div>
  );
};

export default PokemonCard;
