const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('route="/" - (sensor)[GET]', Date());
});

router.post('/create', async (req, res) => {
    console.log('route="/create" - (sensor)[POST]', Date());
});

router.put('/update', async (req, res) => {
    console.log('route="/update" - (sensor)[PUT]', Date());
});

router.delete('/delete', async (req, res) => {
    console.log('route="/delete" - (sensor)[DELETE]', Date());
});

module.exports = router;