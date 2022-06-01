import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="flex flex-wrap py-4 px-4 lg:px-8 bg-slate-100 dark:bg-slate-800 gap-x-4 items-center justify-between">
      <Link to={"/Pokemaniac"}>
        <h2>Pokemaniac</h2>
      </Link>
      <Link to={"/Pokemaniac/teams"}>
        <p>Go to teams</p>
      </Link>
    </div>
  );
};

export default Navbar;
