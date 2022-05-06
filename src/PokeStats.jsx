const PokeStats = ({ stats }) => {
  const statItems = stats.reduce((result, currentStats) => {
    return [
      ...result,
      {
        statType: currentStats?.stat?.name,
        statValue: currentStats?.base_stat,
      },
    ];
  }, []);

  const totalStats = statItems.reduce(
    (result, stat) => result + stat.statValue,
    0
  );

  // out of 600
  return (
    <div>
      <p>Total Base Stats - {totalStats}</p>
    </div>
  );
  return (
    <div>
      {statItems.map((stat) => (
        <div className="stat-row">
          <h6>{stat.statType?.toUpperCase()}</h6>
          <p>{stat.statValue}</p>
        </div>
      ))}
    </div>
  );
  //   return (
  //     <table>
  //       <thead>
  //         <tr>
  //           {statItems.map((stat) => (
  //             <th>{stat?.statType}</th>
  //           ))}
  //         </tr>
  //       </thead>
  //       <tbody>
  //         <tr>
  //           {statItems.map((stat) => (
  //             <td>{stat?.statValue}</td>
  //           ))}
  //         </tr>
  //       </tbody>
  //     </table>
  //   );
};

export default PokeStats;
