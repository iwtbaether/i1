import { makeAutoObservable } from "mobx";
import React from "react";

interface LogContextProps {
  log: LogState;
  add: (message: LogMessage) => void;
  clear: VoidFunction;
}

type LogState = LogMessage[];

type LogMessage = {
  message: string;
  type: LogType;
  timestamp: number;
};

type LogType = "info" | "warn" | "error";

const log: LogState = [
  {
    message: "Welcome!",
    type: "info",
    timestamp: Date.now(),
  },
];

const add = (message: LogMessage) => {
  // if (log.length > 10) log.shift();
  log.push(message);
};

const clear = () => {
  log.length = 0;
};

const createMessage = (message: string, type?: LogType): LogMessage => {
  return {
    message,
    type: type || "info",
    timestamp: Date.now(),
  };
};

class Logger {
  log: LogState = [
    {
      message: "Welcome!",
      type: "info",
      timestamp: Date.now(),
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }
  add = (message: LogMessage) => {
    this.log.push(message);
  };
  clear = () => {
    this.log.length = 0;
  };
}

const logger = new Logger();

const LogContext = React.createContext<LogContextProps>({
  log: logger.log,
  add: logger.add,
  clear: logger.clear,
});

export { LogContext, createMessage };
