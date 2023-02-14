import { observer } from "mobx-react-lite";
import { TodoList, Todo, Room } from "../engine/mob/snake";
import { ChestRarities, EncounterType } from "../engine/mob/SnakeTypes";

const BadEncounterStyle = { color: "red" };
const BadEncounters: EncounterType[] = [
  EncounterType.Enemy,
  EncounterType.AggressiveEnemy,
  EncounterType.Scout,
  EncounterType.Trap,
];

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

const room = new Room("Home Room", 98501);
// const room = new Room("Home Room 2 ", 9850100);
// const room = new Room("Random Room", Math.random() * 10000);

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
    <div>
      {room.name} - Hiding: {room.hidingSpot}
    </div>
    <div>{room.id}</div>
    <div>Chests: {room.chestCount}</div>
    <div>
      {room.chests.map((chest) => {
        const chestStyle = ChestStyleMap[chest.chestRarity];
        return (
          <div key={chest.id} style={chestStyle}>
            {chest.id} - {chest.chestType} - {chest.chestRarity}
          </div>
        );
      })}
    </div>
    <div>Encounters: {room.encounters.length}</div>
    <div>
      {room.encounters.map((encounter, index) => {
        const isBadEncounter = BadEncounters.includes(encounter);
        return (
          <div
            key={index}
            style={isBadEncounter ? BadEncounterStyle : undefined}
          >
            {encounter}
          </div>
        );
      })}
    </div>
    <div>
      {room.nums.map((num) => (
        <div key={num}>{num}</div>
      ))}
    </div>
  </div>
));

const Sneak = () => {
  return (
    <div>
      <RoomView room={room} />
      {false && <TodoListView todoList={store} />}
    </div>
  );
};

export { Sneak };
