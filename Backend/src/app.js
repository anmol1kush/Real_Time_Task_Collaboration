import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
// import projectRoutes from "./routes/project.routes.js";

const app = express();

/* -------- Middlewares -------- */
app.use(cors());
app.use(express.json({ limit: "5mb" }));

/* -------- Routes -------- */
app.use("/api/auth", authRoutes);
// app.use("/api/projects", projectRoutes);

app.get("/", (_, res) => {
  res.send("RTCT API is running");
});

export default app;