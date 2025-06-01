import { analyzeText } from '../services/detectFakeNews.service.js';

export const detectFakeNews = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
        return res.status(400).json({ error: 'article text is reqired for fake news detection.' });
        }

        const result = await analyzeText(text);
        console.log("Incoming text:", text);
        return res.status(200).json(result);
    } catch (error) {
        console.error('News detection failed:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
