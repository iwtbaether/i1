import React from "react";
import "./App.css";
import { gameReducer } from "./engine/reducer";
import { initialGameState } from "./engine/types";

function App() {
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);

  React.useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <div>hi there</div>
      <div>
        <button onClick={() => dispatch({ type: "start" })}>Start</button>
      </div>
      <div> {state.count} seconds elapsed.</div>
    </div>
  );
}

export default App;
