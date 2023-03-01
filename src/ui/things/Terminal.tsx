import { observer } from "mobx-react-lite";
import React from "react";

interface TerminalResponse {
  text: string;
  style: string;
}
export const Terminal = observer(() => {
  const [response, setResponse] = React.useState<TerminalResponse>({
    text: "hello",
    style: "",
  });
  const send = (message: string) => {
    //send message
    //get response
  };
  return <div>Terminal</div>;
});
