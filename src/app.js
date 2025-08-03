import express from "express"
import cors from "cors";
import fakeNewsRoutes from "./routes/detectFakeNews.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to LieDetector API",
    });
});

app.use('/api/fake-news-detect', fakeNewsRoutes);

export {app}