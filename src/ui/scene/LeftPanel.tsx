import { observer } from "mobx-react-lite";
import React from "react";
import { createMessage, LogContext } from "../../context/LogContext";

interface LogItemProps {
  message: string;
}

const LogItem = ({ message }: LogItemProps) => {
  return <div>{message}</div>;
};

const LogItems = observer(() => {
  const { log } = React.useContext(LogContext);

  return (
    <>
      {log.map((message, index) => {
        return <LogItem key={index} message={message.message} />;
      })}
    </>
  );
});

function LeftPanel() {
  const { add, clear } = React.useContext(LogContext);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     add(createMessage("tick"));
  //     // console.log("log tick");
  //   }, 300);

  //   return () => clearInterval(timer);
  // }, [add]);

  return (
    <>
      <button onClick={clear}>Clear</button>
      <LogItems />
    </>
  );
}

export default LeftPanel;
