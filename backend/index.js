import express from "express";
import { PORT } from "./src/config/envVars.config.js";
import connectionDB from "./src/db/db.connection.js";
import userRoutes from "./src/routes/user.routes.js";
import blogRoutes from "./src/routes/blog.routes.js";
import path from "path";

const app = express();

const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/images", express.static(path.join(__dirname, "/uploads")));

connectionDB(
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  })
)
  .then()
  .catch((error) => {
    console.log(error);
  });
