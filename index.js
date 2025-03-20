const express = require("express");
const requestIp = require("request-ip");
const cors = require("cors");
const os = require("os");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.use(requestIp.mw());

app.get("/api/get-ip", (req, res) => {
  let serverIp = "";
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        console.log("Server IP Address:", net.address);
        serverIp = net.address;
      }
    }
  }
  res.json({
    serverIp,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
