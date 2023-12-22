import 'dotenv/config';
import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/url.js';
import { validateUrl } from '../utils/utils.js';

const router = express.Router();
const BASE = process.env.BASE;

router.post("/short", async (req, res) => {
    const { origUrl } = req.body;
    const base = BASE;

    const urlId = nanoid();
    if (validateUrl(origUrl)) {
        try {
            let url = await Url.findOne({ origUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${base}/${urlId}`;
                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date()
                });
                await url.save();
                res.json(url);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json("Server Error");
        }
    } else {
        res.status(400).json("Invalid Original Url");
    }
});

export default router;