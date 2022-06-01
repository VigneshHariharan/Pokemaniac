import { fetchAllPokemonMoves } from "@hooksAndUtils/pokemonDataHandlers";
import { useEffect, useState } from "react";

const PokemonMoves = ({ moves }) => {
  const [pokemonMoveDetails, setPokemonMoveDetails] = useState([]);

  useEffect(function getPokemonMoveDetails() {
    const getAllMoves = async () => {
      const movesData = await fetchAllPokemonMoves();
      setPokemonMoveDetails(movesData);
    };
    getAllMoves();
  }, []);

  if (!moves) return null;

  return (
    <div>
      {moves.map((moveObj) => {
        const moveKey = moveObj?.move?.name;
        const moveDetails = pokemonMoveDetails[moveKey];
        if (!moveDetails) return null;
        return (
          <div key={moveKey} className="flex flex-wrap gap-2">
            <p>{moveDetails?.title}</p>
            <p className="text-orange-400">
              {moveDetails?.type?.toUpperCase()}
            </p>
            <p>power: {moveDetails?.power || 0}</p>
            <p>accuracy: {moveDetails?.accuracy || 100}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PokemonMoves;
