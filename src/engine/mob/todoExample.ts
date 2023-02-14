import { makeObservable, observable, action, computed } from "mobx";

class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title: string) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action,
    });
    this.title = title;
  }

  toggle() {
    this.finished = !this.finished;
  }
}

class TodoList {
  todos: Todo[] = [];
  get unfinishedTodoCount() {
    return this.todos.filter((todo) => !todo.finished).length;
  }
  constructor(todos: Todo[]) {
    makeObservable(this, {
      todos: observable,
      unfinishedTodoCount: computed,
    });
    this.todos = todos;
  }
}

export { Todo, TodoList };
