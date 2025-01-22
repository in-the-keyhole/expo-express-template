/**
 * Copyright © 2024-2025 Boardman Enterprises, LLC
 * All rights reserved.
 */

import compression from "compression";
import https from "https";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import enforceSSL from "express-sslify";

import config from './config';

const app = express();

// Add headers
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, HEAD, DELETE",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization",
  );

  if (config.clientHost) {
    if (config.clientHost.includes(req.headers.origin)) {
      res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    }
  }

  res.setHeader("Cache-Control", "no-cache, no-store");

  // Pass to next layer of middleware
  next();
});

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};

app.use(compression({ filter: shouldCompress }));

app.use(express.json({ limit: "25mb" }));

// Extensions to process incoming requests
if (process.env.NODE_ENV === "production") {
  console.log("Enforcing SSL on all requests...");
  app.use(enforceSSL.HTTPS({ trustProtoHeader: true }));
}

app.use(bodyParser.json());

app.use(
  cors({
    origin: config.clientHost,
    methods: "GET, POST, OPTIONS, PUT, PATCH, HEAD, DELETE",
    credentials: true,
    allowedHeaders:
      "x-requested-with,content-type,authorization,x-pennies-ai-sess-key",
  }),
);

// processes either on Ctrl-C or kill
process.on("exit", () => {
  console.log("Exit requested...");

  // close other resources here
  console.log("done");
});

// happens when you press Ctrl+C
process.on("SIGINT", () => {
  console.log("\nGraceful shutdown from  SIGINT (Crtl-C)");
  process.exit();
});

// usually called with kill
process.on("SIGTERM", () => {
  console.log("Someone killed us");
  // exit cleanly
  process.exit(0);
});

// route functions below here

// example route call - no routes are provided with this template
// app.post("/api/v1/login", async (req, res) => {
//   res.setHeader("Content-Type", "application/json");

//   let objectResult = await loginProcessor(config, req, res);
//   res.send(JSON.stringify(objectResult));
// });

const dirname = __dirname + "/../dist";

app.use(express.static(dirname));
app.get("/*", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  fs.createReadStream(dirname + "/index.html").pipe(res);
});

if (config.localSsl) {
  const options = {
    key: fs.readFileSync("/path/to/your/key.pem"),
    cert: fs.readFileSync("/path/to/your/cert.pem"),
    requestCert: false,
    rejectUnauthorized: false,
  };

  https.createServer(options, app).listen(config.nodePort || 8080, function () {
    console.log("server running on port " + (config.nodePort || 8080));
  });
} else {
  console.log("server running on port " + (config.nodePort || 8080));
  const server = app.listen(config.nodePort || 8080);
  server.keepAliveTimeout = 60000;
}
