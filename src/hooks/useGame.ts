import React from "react";
import { MobGameContext } from "../context/MobGameContext";

function useGame() {
  const { game } = React.useContext(MobGameContext);

  React.useEffect(() => {
    const timer = setInterval(() => {
      game.timer.tick();
    }, 300);

    return () => clearInterval(timer);
  }, []);
}

export { useGame };
