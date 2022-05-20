import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <div className="flex flex-wrap py-4 px-8 bg-slate-100 dark:bg-slate-800 gap-x-4 items-center">
      <Link to={"/Pokemaniac"}>
        <h1>Pokemaniac</h1>
      </Link>
    </div>
  );
};

export default Navbar;
