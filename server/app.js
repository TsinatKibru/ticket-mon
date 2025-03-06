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
    origin: "*", // Allow requests from your React frontend
    credentials: false, // Allow cookies and credentials
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

app.get("/", (req, res) => {
  res.send("welcome to your api");
});

//app.listen(PORT, async () => {
//  console.log("Ticket Monitoring API running on", PORT);
//  await connectToDatabase();
//});
if (!process.env.VERCEL) {
  app.listen(PORT || 5500, async () => {
    console.log("Ticket Monitoring API running on", PORT || 5000);
    await connectToDatabase();
  });
}
export default app;
