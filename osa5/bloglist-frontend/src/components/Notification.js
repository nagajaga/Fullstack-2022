import { useEffect } from "react";

const Notification = ({ message, error, setMessage }) => {
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(null), 5000);
    }
  }, [message, setMessage]);

  if (message === null) {
    return null;
  }
  if (!error) {
    return <div className="success">{message}</div>;
  }
  return <div className="error">{message}</div>;
};

export default Notification;
