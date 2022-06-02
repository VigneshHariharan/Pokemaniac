import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="flex flex-wrap py-4 px-4 lg:px-8 bg-slate-100 dark:bg-slate-800 gap-x-4 items-center justify-between">
      <Link to={"/Pokemaniac"}>
        <h3>Pokemaniac</h3>
      </Link>
      {/* <Link to={"/Pokemaniac/teams"}>
        <p>Visit Teams</p>
      </Link> */}
    </div>
  );
};

export default Navbar;
