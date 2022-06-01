const PokeStats = ({ stats, isDetailed = false }) => {
  if (!stats) return null;
  const totalStats = stats.reduce(
    (result, statObj) => result + statObj.stat,
    0
  );

  // out of 600
  if (!isDetailed)
    return (
      <div>
        <p>Total Base Stats - {totalStats}</p>
      </div>
    );

  return (
    <div>
      {stats.map((statObj) => (
        <div key={statObj.name}>
          <h6>{statObj.name}</h6>
          <p>{statObj.stat}</p>
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
