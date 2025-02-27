import express from "express";
import { toDataURL } from "qrcode";

const app = express();
const PORT = 3000;

// Serve static files

// API to generate QR code
app.get("/generate", async (req, res) => {
    const { text } = req.query;

    if (!text) {
        return res.status(400).send("Text query parameter is required");
    }

    try {
        const qrCode = await toDataURL(text);
        res.send(`<img src="${qrCode}" alt="QR Code"><br><a href="/">Go Back</a>`);
    } catch (err) {
        res.status(500).send("Error generating QR Code");
    }
});

// Homepage form to enter text
app.get("/", (req, res) => {
    res.send(`
        <h2>Generate QR Code</h2>
        <form action="/generate" method="get">
            <input type="text" name="text" placeholder="Enter text" required>
            <button type="submit">Generate</button>
        </form>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
