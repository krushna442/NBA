import express from "express";
import multer from "multer";
import { read } from "jimp";
import qrCodeReader from "qrcode-reader";
import { unlinkSync } from "fs";

const app = express();
const PORT = 3000;

// Multer setup for handling image uploads
const upload = multer({ dest: "uploads/" });

// Upload & Decode QR Code
app.post("/scan", upload.single("qrImage"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("Please upload an image");
    }

    try {
        const image = await read(req.file.path);
        const qr = new qrCodeReader();
        
        qr.callback = (err, result) => {
            unlinkSync(req.file.path); // Delete uploaded file after scanning

            if (err || !result) {
                return res.status(500).send("Failed to scan QR code");
            }

            res.send(`<h3>QR Code Data: ${result.result}</h3><br><a href="/">Go Back</a>`);
        };

        qr.decode(image.bitmap);
    } catch (error) {
        res.status(500).send("Error processing QR code");
    }
});

// Home Page (Upload QR Code Image)
app.get("/", (req, res) => {
    res.send(`
        <h2>Scan QR Code</h2>
        <form action="/scan" method="post" enctype="multipart/form-data">
            <input type="file" name="qrImage" accept="image/*" required>
            <button type="submit">Scan</button>
        </form>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
