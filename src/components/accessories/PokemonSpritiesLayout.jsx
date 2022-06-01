import { useMemo } from "react";

const PokemonSpritiesLayout = ({ sprities, pokemonName }) => {
  const images = useMemo(() => {
    if (!sprities) return;
    const commonSprities = Object.entries(sprities)?.filter(
      ([key, value]) => typeof value === "string"
    );
    return commonSprities;
  }, [sprities]);
  return (
    <div className="flex flex-wrap gap-2">
      {images?.map(([type, image]) => (
        <img key={type} src={image} alt={type} />
      ))}
    </div>
  );
};

export default PokemonSpritiesLayout;
