import axios from 'axios';

export const analyzeText = async (text) => {
    try {
        console.log("Calling Hugging Face API...");
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/mrm8488/bert-tiny-finetuned-fake-news-detection',
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                },
            }
        );

        console.log("Hugging Face API response:", response.data);

        const predictions = response.data?.[0];
        if (!Array.isArray(predictions)) throw new Error("Invalid prediction format");

        const sorted = predictions.sort((a, b) => b.score - a.score);
        const top = sorted[0];

        const label = top?.label || '';
        const confidence = Math.round((top?.score || 0) * 100);

        return {
            isFake: label === 'LABEL_1',
            confidence,
            explanation: `Model predicted '${label}' with ${confidence}% confidence.`,
        };
    } catch (err) {
        console.error('Hugging Face API error:', err.message);
        return {
            isFake: null,
            confidence: 0,
            explanation: 'Hugging Face API call failed or returned invalid data.',
        };
    }
};
