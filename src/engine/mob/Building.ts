import { INIT } from "./../../util/consts";
export class Building {
  seed: number = INIT.number;
  name: string = INIT.string;
  level: number = INIT.number;
  rooms: string[] = []; // todo turn into room objects
  type: string = INIT.string; // todo enum
}
