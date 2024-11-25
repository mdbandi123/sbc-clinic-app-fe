import React, { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WebSocketTest = () => {
  useEffect(() => {
    // WebSocket connection
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str), // Debug messages
      onConnect: () => {
        console.log("Connected to WebSocket");

        // Subscribe to /topic/data-update
        stompClient.subscribe("/topic/data-update", (message) => {
          console.log("Received message:", message.body);
          alert(`WebSocket Message: ${message.body}`);
        });
      },
      onStompError: (frame) => {
        console.error("WebSocket Error:", frame.headers["message"]);
        console.error("Details:", frame.body);
      },
    });

    stompClient.activate();

    // Clean up on unmount
    return () => {
      stompClient.deactivate();
    };
  }, []);

  return <h1>Listening for WebSocket updates...</h1>;
};

export default WebSocketTest;
