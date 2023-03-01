export interface GameModule<T> {
  saveKey: string;
  getSaveData: () => T;
  loadSaveData: (data: Partial<T>) => void;
}
