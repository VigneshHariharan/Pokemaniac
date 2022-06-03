const PokeStats = ({ stats, isDetailed = false }) => {
  if (!stats) return null;
  const totalStats = stats.reduce(
    (result, statObj) => result + statObj.stat,
    0
  );

  return (
    <div className="flex flex-col gap-2 px-4">
      <h4 className="mb-1 text-left">Base Stats: </h4>
      {stats.map((statObj) => {
        const statPercentage = Math.floor((statObj.stat / 600) * 100);

        return (
          <div
            key={statObj.name}
            className="grid grid-cols-[2fr_3fr_1fr] items-center gap-x-4"
          >
            <h6 className="capitalize text-left">{statObj.name}</h6>
            <div className="w-[100%] bg-slate-700 h-2 rounded ">
              <div
                style={{
                  width: statPercentage + "%",
                }}
                className={`bg-slate-50 h-2 rounded`}
              ></div>
            </div>
            <p className="text-left">{statObj.stat}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PokeStats;
