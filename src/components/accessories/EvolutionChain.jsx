import { PokemonCard } from "@components/accessories";

const EvolutionChain = ({ evolutionDetails }) => {
  if (!evolutionDetails || evolutionDetails?.length <= 0) return null;
  return (
    <div className="border-2 p-2">
      {evolutionDetails?.map((chain) => (
        <div key={chain.name}>
          <PokemonCard
            pokemon={chain.listDetails}
            handlePokemonDetails={() => {}}
          />
          {chain.trigger && (
            <p>
              {chain.trigger} at {chain.levelAt}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EvolutionChain;
