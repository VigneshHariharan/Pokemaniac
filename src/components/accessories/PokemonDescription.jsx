import { useMemo } from "react";

const PokemonDescriptions = ({ descriptions }) => {
  // console.log("opke", descriptions);

  const description = descriptions.filter(
    (file) => file?.language?.name === "en"
  );

  // TODO: group description so it doesn't repeat and take one for overall then name version
  return (
    <div>
      <p>Pokemon Description</p>
      {description?.map((des) => (
        <div key={des?.version?.name}>
          {" "}
          <p>{des.flavor_text}</p>
          <p>Version: {des?.version?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default PokemonDescriptions;
