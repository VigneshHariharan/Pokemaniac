const PokeStats = ({ stats }) => {
  const totalStats = stats.reduce(
    (result, statObj) => result + statObj.stat,
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
