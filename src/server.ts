import "dotenv/config";
import http from "http";
import app from "./app";
import { initSocket } from "./socket";
import { startJob } from "./job";

const PORT = 5000;

const server = http.createServer(app);

// 🔥 start background job
startJob();

// 🔥 initialize socket
initSocket(server);

// 🔥 IMPORTANT: use server.listen
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});