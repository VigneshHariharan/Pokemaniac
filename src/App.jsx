import { useState } from "react";
import PokeListing from "@components/main/PokeListing";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <PokeListing />
    </div>
  );
}

export default App;
