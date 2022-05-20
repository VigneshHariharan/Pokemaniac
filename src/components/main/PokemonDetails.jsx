import { usePokemonDetails } from "@hooksAndUtils/usePokemonDetails";
// import { use } from "react-router-dom";
import { Navbar } from "@components/common";

const PokemonDetails = () => {
  const { pokeDetails, isPokeDetailsLoading, detailsErrorMessage } =
    usePokemonDetails();

  if (isPokeDetailsLoading) return <div>Loading</div>;
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="flex">
          <h2>{pokeDetails?.name || ""}</h2>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
