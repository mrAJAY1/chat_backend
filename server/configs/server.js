import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { config as dotenvConfig } from "dotenv";
import { Server } from "socket.io";
import authRouter from "../routes/auth.js";

dotenvConfig();
const { PORT, MONGO_URI } = process.env;
const app = express();
const db = mongoose.connection;
app.use(cookieParser());
app.use(json());
app.use(
  cors({
    origin: "localhost:3000",
    methods: ["GET", "POST"],
  })
);

app.use("/api/user/auth", authRouter);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "internal error";
  res.status(status).json({ msg: message });
});

mongoose.connect(MONGO_URI);
db.once("open", () => {
  console.log("Database connected");
});
db.on("error", console.error.bind(console, "there has been an error : "));

const server = app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

const io = new Server(server);

io.on("connection", () => {
  console.log("socket connected");
});
