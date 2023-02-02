import React from "react";

interface LogContextProps {
  log: LogState;
  add: (message: LogMessage) => void;
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

const createMessage = (message: string, type?: LogType): LogMessage => {
  return {
    message,
    type: type || "info",
    timestamp: Date.now(),
  };
};

const LogContext = React.createContext<LogContextProps>({
  log,
  add,
});

export { LogContext, createMessage };
