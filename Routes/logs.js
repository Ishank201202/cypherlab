const express = require('express');
const Logs = require('../Models/logs.model');
const router = express.Router();

router.post('/api/logs/decipher', async (req, res) => {
    const { input, key, cipher } = req.body;

    if (!input || !cipher) {
        return res.status(422).json({ error: "input and cipher are req" });
    }
    var splitString = input.split("");
    var reverseArray = splitString.reverse();
    var output = reverseArray.join("");
    const logs = new Logs({ input, key, cipher, output });

    const logCreate = await logs.save();
    if (logCreate) {
        res.status(201).json({ message: "log created successfully" });
    } else {
        res.status(500).json({ error: "Failed to create log" });
    }
});
router.get('/api/logs/getlogs', async (req, res) => {
    try {
        const logs = await Logs.find().sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch logs" });
    }
});
module.exports = router;
