const express = require('express');
const router = express.Router();
const {
    selectSensors, 
    selectSensorsById, 
    createSensor, 
    updateSensor, 
    deleteSensor
} = require('../model/sensor-model');

router.get('/', async (req, res) => {
    try {
        console.log('route="/" - (sensor)[GET]', Date());
        const data = selectSensors();
        res.status(200).json(data);
    } catch (error) {
        
        res.status(400).send('error')
        console.log(error)   
    }
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