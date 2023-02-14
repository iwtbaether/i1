import React from "react";
import "./App.css";
import { EngineContext } from "./context/EngineContext";
import { createMessage, LogContext } from "./context/LogContext";
import { gameReducer } from "./engine/reducer";
import { initialGameState } from "./engine/types";
import NavBar from "./ui/NavBar";
import town from "./assets/art/town.png";
import { Sneak } from "./ui/Sneak";
import RightPanel from "./ui/RightPanel";

function App() {
  const [state, dispatch] = React.useReducer(gameReducer, initialGameState);
  const { log, add } = React.useContext(LogContext);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (false) {
        dispatch({ type: "tick" });
        add(createMessage("tick"));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <EngineContext.Provider value={{ state, dispatch }}>
        <div className="game">
          <div className="GameHeader">
            <NavBar />
            <div>stuff</div>
            <div>stuff</div>
          </div>
          <div className="main">
            <div className="GameLog">
              {log.map((message, index) => {
                return <div key={index}>{message.message}</div>;
              })}
            </div>
            <div className="GameContent">
              <img
                src={town}
                className="town-art"
                alt="town art"
                style={{ width: "100%" }}
              />
              <div>hi there</div>
              <div>
                <button onClick={() => dispatch({ type: "start" })}>
                  Start
                </button>
              </div>
              <div>
                <Sneak />
              </div>
            </div>
            <RightPanel />
          </div>
          <div className="footer">
            <div> {state.count} seconds elapsed.</div>
          </div>
        </div>
      </EngineContext.Provider>
    </div>
  );
}

export default App;
