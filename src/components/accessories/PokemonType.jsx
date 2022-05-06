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
const PokemonType = ({ typeObj }) => {
  const typeName = typeObj;
  return (
    <div className="type">
      <p className={`--type-${typeName}`}>{typeName?.toUpperCase()}</p>
    </div>
  );
};

export default PokemonType;
