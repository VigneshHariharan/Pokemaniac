import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeListing from "@components/main/PokeListing";
import PokemonDetails from "@components/main/PokemonDetails";
import PokeTeam from "@components/main/PokeTeam";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              path="/Pokemaniac"
              // path="/"
              element={<PokeListing />}
              key="pokelisting"
            />
            <Route
              path="/Pokemaniac/:pokemon"
              // path="/:pokemon"
              element={<PokemonDetails />}
              key="pokeDetails"
            />
            <Route
              path="/Pokemaniac/teams"
              // path="/:pokemon"
              element={<PokeTeam />}
              key="pokeTeam"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
