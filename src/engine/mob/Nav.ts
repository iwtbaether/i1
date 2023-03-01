import { action, makeObservable, observable } from "mobx";
import { Game } from "./Game";
import { GameModule } from "./interfaces/GameModule";

enum Pages {
  main = "Main",
  options = "Options",
  sneak = "Sneak",
}

interface NavSave {
  currentPage: Pages;
}

class Nav implements GameModule<NavSave> {
  saveKey = "nav";
  getSaveData = () => {
    return {
      currentPage: this.currentPage,
    };
  };
  loadSaveData = (data: Partial<NavSave>) => {
    this.currentPage = data.currentPage || this.currentPage;
  };

  game: Game;
  currentPage: Pages = Pages.main;
  constructor(game: Game) {
    this.game = game;
    makeObservable(this, {
      currentPage: observable,
      setPage: action,
    });
  }
  setPage(page: Pages) {
    this.currentPage = page;
  }
}

export { Nav, Pages };
