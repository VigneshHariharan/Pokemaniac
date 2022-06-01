import PokemonType from "@components/accessories/PokemonType";
import PokeStats from "@components/accessories/PokeStats";

const PokemonCard = (props) => {
  const { pokemon, handlePokemonDetails } = props;
  return (
    <div
      tabIndex={0}
      className="cursor-pointer
        pr-4 py-2
        pl-2
       rounded-sm transition-all ease-in-out delay-2  hover:bg-slate-100 hover:dark:bg-slate-800"
      onClick={() => handlePokemonDetails(pokemon.name)}
    >
      <div className="flex items-center gap-3">
        <div className="w-28 h-28 min-w-[7rem]">
          <img
            src={pokemon?.sprites?.front_default || "images/pokeball.svg"}
            alt={pokemon.name + " image"}
            className="block"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h5 className="font-sans text-left">{pokemon.name?.toUpperCase()}</h5>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex gap-x-2 flex-wrap">
              {pokemon.types?.map((typeObj) => (
                <PokemonType typeObj={typeObj} key={typeObj} />
              ))}
            </div>
            <div className="flex gap-x-2 flex-wrap">
              <p>W - {Math.floor(pokemon.weight * 0.1)} kg</p>
              <p>H - {Math.floor(pokemon.height * 10)} cm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
