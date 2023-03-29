import express, { json } from "express";
import cors from "cors";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log("Server On"));
