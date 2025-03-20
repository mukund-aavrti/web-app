const express = require("express");
const requestIp = require("request-ip");
const cors = require("cors");
const os = require("os");

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

app.get("/api/get-ip", (req, res) => {
  const interfaces = os.networkInterfaces();
  const ips = [];

  for (const name in interfaces) {
    for (const net of interfaces[name]) {
      if (net.family === "IPv4" && !net.internal) {
        ips.push(net.address);
      }
    }
  }

  res.json({ serverIps: ips });
});


// app.get('/api/get-ip', (req, res) => {
//   var clientIp = requestIp.getClientIp(req)
//   res.send(`Your IP Address is ${clientIp}.`)
//   //   res.json({
//   //   serverIp,
//   // });
// })
// app.get("/api/get-ip", (req, res) => {
//   let serverIp = "";
//   const interfaces = os.networkInterfaces();
//   for (const name in interfaces) {
//     for (const net of interfaces[name]) {
//       if (net.family === "IPv4" && !net.internal) {
//         console.log("Server IP Address:", net.address);
//         serverIp = net.address;
//       }
//     }
//   }
//   res.json({
//     serverIp,
//   });
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
