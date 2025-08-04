import { useEffect, useState } from "react";

import classes from "./Message.module.css";

import bus from "../../utils/bus";

const Message = () => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisibility(false);
      }, 2000);
    });
  }, []);

  return (
    visibility && (
      <div className={`${classes.message} ${classes[type]}`}>{message}</div>
    )
  );
};

export default Message;
