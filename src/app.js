import express from "express"
import cors from "cors";
import fakeNewsRoutes from "./routes/detectFakeNews.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/fake-news-detect', fakeNewsRoutes);

export {app}