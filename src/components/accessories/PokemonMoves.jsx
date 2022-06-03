import { fetchAllPokemonMoves } from "@hooksAndUtils/pokemonDataHandlers";
import { useEffect, useState } from "react";
import PokemonType from "@components/accessories/PokemonType";

const PokemonMoves = ({ moves }) => {
  const [pokemonMoveDetails, setPokemonMoveDetails] = useState([]);

  useEffect(function getPokemonMoveDetails() {
    const getAllMoves = async () => {
      const movesData = await fetchAllPokemonMoves();
      setPokemonMoveDetails(movesData.data);
    };
    getAllMoves();
  }, []);

  if (!moves) return null;

  const moveCats = ["Move name", "Type", "Power", "Accuracy", "Effect"];

  return (
    <div className="overflow-x-scroll">
      <table>
        <thead>
          <tr className="bg-slate-800 h-12 rounded-sm">
            {moveCats.map((type) => {
              return (
                <th className="text-left" key={type}>
                  {type}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {moves.map((moveObj) => {
            const moveKey = moveObj?.move?.name;
            const moveDetails = pokemonMoveDetails[moveKey];
            if (!moveDetails) return null;
            return (
              <tr key={moveKey}>
                <td className="text-left min-w-fit w-100% min-h-full">
                  {moveDetails?.title}
                </td>
                <td>
                  <PokemonType typeObj={moveDetails?.type} />
                </td>
                <td className="text-left">{moveDetails?.power || 0}</td>
                <td className="text-left"> {moveDetails?.accuracy || 100}</td>
                <td className="text-left break-word ">
                  {moveDetails?.effectEntries?.replace(
                    "$effect_chance",
                    moveDetails?.effectChance
                  ) || ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonMoves;
