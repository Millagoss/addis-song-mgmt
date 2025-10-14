import express from "express";
import cors from "cors";
import morgan from "morgan";
import songsRouter from "./routes/songs.routes";
import statsRouter from "./routes/stats.routes";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { ENV } from "./config/env";

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/songs", songsRouter);
app.use("/api/stats", statsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
