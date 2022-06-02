import { PokemonCard } from "@components/accessories";

const EvolutionChain = ({ evolutionDetails }) => {
  if (!evolutionDetails || evolutionDetails?.length <= 0) return null;
  console.log("evolutionDetails", evolutionDetails);
  return (
    <div className="mb-4">
      <h4 className="text-left">Evolution Chain</h4>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4">
        {evolutionDetails?.map((chain) => (
          <div
            key={chain.name}
            className="flex flex-col gap-2 pl-2 border-l-[0.5px] border-l-fuchsia-50"
          >
            <PokemonCard
              pokemon={chain.listDetails}
              handlePokemonDetails={() => {}}
            />
            {chain.trigger && (
              <p className="text-left w-60">
                Through {chain.trigger} {chain.levelAt}{" "}
                {chain.needsRain && " Needs rain"}{" "}
                {!!chain.happiness &&
                  ` Requires minimum happiness of ${chain.happiness}`}
                {!!chain.timeOfDay && ` at ${chain.timeOfDay}`}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
