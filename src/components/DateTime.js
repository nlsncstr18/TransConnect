import React, { useState, useEffect } from "react";

// import io from "socket.io-client";

const DateTime = () => {
  // const socket = io("http://localhost:8080");
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [lastMessage, setLastMessage] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  // useEffect(() => {
  //   try {
  //     socket.emit("register_trip", {
  //       id: 12,
  //       maxPassenger: 12,
  //       latitude: 13,
  //       longitude: 14,
  //     });
  //     console.log("Success");
  //   } catch {
  //     console.log("error");
  //   }

  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });
  //   socket.on("message", (data) => {
  //     setLastMessage(data);
  //   });
  //   socket.on("received", () => {
  //     setIsConnected(true);
  //     console.log("received");
  //   });
  // }, []);

  return (
    <div>
      <p>
        {date.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        })}
      </p>
    </div>
  );
};

export default DateTime;
