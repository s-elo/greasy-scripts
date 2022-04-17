import fs from "fs-extra";
import path from "path";
import express from "express";
import open from "open";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const servePath = path.resolve(__dirname, "../", "dist");
const port = 3250;

app.get("/", (_, res) => {
  res.sendFile(path.resolve(servePath, "index.html"));
});

const createWatcher = (watchPath: string) => {
  fs.watch(watchPath, (_, filename) => {
    if (filename) {
      io.sockets.emit("reload");
    }
  });
};

server.listen(port, () => {
  console.log(`listening on ${port}`);
  open(`http://localhost:${port}`);
  createWatcher(servePath);
});
