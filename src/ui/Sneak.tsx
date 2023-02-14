import { observer } from "mobx-react-lite";
import { TodoList, Todo } from "../engine/mob/todoExample";
import { Room } from "../engine/mob/Room";
import {
  ChestRarities,
  EncounterType,
  RoomHidingSpot,
} from "../engine/mob/SnakeTypes";
import React from "react";
import { ChestNames } from "../engine/mob/RoomChestMap";
import { action, makeObservable, observable } from "mobx";
import { MobGameContext } from "../context/MobGameContext";
import { ActivityBar } from "./ActivityBar";

const BadEncounterStyle = { color: "red" };
const GoodEncounterStyle = { color: "green" };
const WarningEncounterStyle = { color: "orange" };

const BadEncounters: EncounterType[] = [
  EncounterType.Enemy,
  EncounterType.AggressiveEnemy,
  EncounterType.Scout,
  EncounterType.Trap,
];

const GoodEncounters: EncounterType[] = [
  EncounterType.Ore,
  EncounterType.FishingSpot,
  EncounterType.Tree,
];

const WarningEncounters: EncounterType[] = [EncounterType.TreasureBlockade];

const EncounterStyleMap: { [key in EncounterType]: React.CSSProperties } = {
  [EncounterType.Enemy]: BadEncounterStyle,
  [EncounterType.AggressiveEnemy]: BadEncounterStyle,
  [EncounterType.Scout]: BadEncounterStyle,
  [EncounterType.Trap]: BadEncounterStyle,
  [EncounterType.Ore]: GoodEncounterStyle,
  [EncounterType.FishingSpot]: GoodEncounterStyle,
  [EncounterType.Tree]: GoodEncounterStyle,
  [EncounterType.TreasureBlockade]: WarningEncounterStyle,
};

const CommonChestStyle = { color: "grey" };
const RareChestStyle = { color: "green" };
const EpicChestStyle = { color: "blue" };

const ChestStyleMap: { [key in ChestRarities]: React.CSSProperties } = {
  [ChestRarities.common]: CommonChestStyle,
  [ChestRarities.rare]: RareChestStyle,
  [ChestRarities.epic]: EpicChestStyle,
};

const store = new TodoList([
  new Todo("Get Coffee"),
  new Todo("Write simpler code"),
]);

const TodoListView = observer(({ todoList }: { todoList: TodoList }) => (
  <div>
    <ul>
      {todoList.todos.map((todo) => (
        <TodoView todo={todo} key={todo.id} />
      ))}
    </ul>
    Tasks left: {todoList.unfinishedTodoCount}
  </div>
));

const TodoView = observer(({ todo }: { todo: Todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => todo.toggle()}
      onChange={() => {}}
    />
    {todo.title}
  </li>
));

const RoomView = observer(({ room }: { room: Room }) => (
  <div>
    <ActivityBar />
    <div>
      {room.name} - Hiding: {room.hidingSpot}
    </div>
    {!room.isExplored && (
      <div>
        Exploration Progress: {room.explored}/{room.explorePerFind}
      </div>
    )}
    <div>
      Finds {room.remainingFinds}/{room.totalFinds}
    </div>
    <div>{room.purpose}</div>
    <div>Chests: {room.chestCount}</div>
    <div>
      {room.chests.map((chest) => {
        const chestStyle = ChestStyleMap[chest.chestRarity];
        return (
          <div key={chest.id} style={chestStyle}>
            {/* <div>
              {chest.id} - {chest.chestType} - {chest.chestRarity}
            </div> */}
            <div>
              {ChestNames[room.purpose][chest.chestType][chest.chestRarity]}
            </div>
            <div>
              <span
                style={{
                  color: chest.discovered ? "green" : "red",
                }}
              >
                Discovered: {chest.discovered.toString()}
              </span>{" "}
              -{" "}
              <span
                style={{
                  color: chest.completed ? "green" : "red",
                }}
              >
                Opened: {chest.completed.toString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
    <div>Encounters: {room.encounters.length}</div>
    <div>
      {room.encounters.map((encounter, index) => {
        const encounterStyle = EncounterStyleMap[encounter.type];
        return (
          <div key={index} style={encounterStyle}>
            {encounter.type} -{" "}
            <span
              style={{
                color: encounter.discovered ? "green" : "red",
              }}
            >
              Discovered: {encounter.discovered.toString()}
            </span>{" "}
            -
            <span
              style={{
                color: encounter.completed ? "green" : "red",
              }}
            >
              Completed: {encounter.completed.toString()}
            </span>
          </div>
        );
      })}
    </div>
    <div>Possible Finds: {room.possibleFinds.length}</div>
  </div>
));

const Sneak = observer(() => {
  const { game } = React.useContext(MobGameContext);

  return (
    <div>
      <button onClick={game.newRoom}>New Room</button>
      <RoomView room={game.room} />
      {false && <TodoListView todoList={store} />}
    </div>
  );
});

export { Sneak };
