import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
  if (!socket) socket = io("http://15.206.16.230:8085");

  return socket;
};

export const getSocket = () => socket;


// export const disconnectSocket = () => {
//   socket?.disconnect();
//   socket = null;
// };
