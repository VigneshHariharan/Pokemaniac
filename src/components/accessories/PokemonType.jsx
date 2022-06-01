// Normal;
// Fire;
// Water;
// Grass;
// Electric;
// Ice;
// Fighting;
// Poison;
// Ground;
// Flying;
// Psychic;
// Bug;
// Rock;
// Ghost;
// Dark;
// Dragon;
// Steel;
// Fairy;

const lightBgTypes = [
  "ground",
  "electric",
  "rock",
  "ice",
  "normal",
  "grass",
  "fire",
  "fairy",
  "bug",
  "flying",
  "steel",
];
const PokemonType = ({ typeObj }) => {
  const typeName = typeObj;
  const typeClass = "bg-types-" + typeName;
  return (
    <div className={`px-1 py-0 ${typeClass} rounded`}>
      <p
        className={
          lightBgTypes?.includes(typeName) ? "!text-zinc-900" : "!text-zinc-50"
        }
      >
        {typeName}
      </p>
    </div>
  );
};

export default PokemonType;
