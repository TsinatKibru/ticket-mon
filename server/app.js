import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import ticketRouter from "./routes/ticket.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import apiLimiter from "./middlewares/ratelimiter.middleware.js";
const app = express();
app.set("trust proxy", 1);

// Enable CORS
app.use(
  cors({
    origin: "https://ticket-mon-18lk.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", apiLimiter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketRouter);

app.use(errorMiddleware);

//app.get("/", (req, res) => {
//  res.send("welcome to your api ");
//});
app.get("/", (req, res) => {
  const port = PORT || "Port not found"; // Get the PORT environment variable
  res.send(`Welcome to your API. Port: ${port}`);
});

//app.listen(PORT, async () => {
//  console.log("Ticket Monitoring API running on", PORT);
//  await connectToDatabase();
//});
if (!process.env.VERCEL) {
  app.listen(PORT, async () => {
    console.log("Ticket Monitoring API running on", PORT);
    await connectToDatabase();
  });
} else {
  connectToDatabase().catch((err) => {
    console.error("Database connection failed:", err);
  });
}
export default app;
