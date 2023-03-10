import { observer } from "mobx-react-lite";
import { TodoList, Todo } from "../../engine/mob/todoExample";
import { Room } from "../../engine/mob/Room";
import { ChestRarities, EncounterType } from "../../engine/mob/SnakeTypes";
import React from "react";
import { ChestNames } from "../../engine/mob/RoomChestMap";
import { action, makeObservable, observable } from "mobx";
import { MobGameContext } from "../../context/MobGameContext";

export const ActivityBar = observer(() => {
  const { game } = React.useContext(MobGameContext);

  return (
    <div>
      <div>Current Activity: {game?.timer.activity}</div>
      <div>
        <button
          onClick={() => {
            game.timer.setActivity("explore");
          }}
          disabled={game.room.isExplored}
        >
          Explore
        </button>
        <button
          onClick={() => {
            game.timer.setActivity("hide");
          }}
        >
          Hide
        </button>
        <button
          onClick={() => {
            game.timer.setActivity("exit");
          }}
          disabled={game.room.exitReady}
        >
          Move Towards Exit
        </button>
        <button onClick={game.exitRoom} disabled={!game.room.exitReady}>
          Exit
        </button>
      </div>
    </div>
  );
});
