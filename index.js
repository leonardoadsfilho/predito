const PORT = 3000;
const express = require('express');
const app = express();

const sensor = require('./src/routes/sensor');
app.use(sensor);

app.listen(PORT, () => {
    console.log(`[API] running at port ${PORT}`);
});