import express from "express"
const router = express.Router();
import { detectFakeNews } from "../controllers/detectFakeNews.controller.js"

router.post('/fake-news', detectFakeNews);

export default router;
