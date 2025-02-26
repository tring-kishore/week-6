console.log("Hello world!");
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/jsonObjects', async (req, res) => {
    try {
        const response = await axios.get('https://api.restful-api.dev/objects');

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: 'Failed to fetch the data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});