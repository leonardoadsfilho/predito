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
        
        const data = await selectSensors();
        
        if (!data) {
            res.status(400).send('empty data');
        }else{
            res.status(200).json(data);
        }
    } catch (error) {
        
        res.status(400).send('error')
        console.log(error)   
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if(!Number.isInteger(id)){
            throw 'input is not a integer';
        }

        if(id <= 0){
            throw 'input not positive';
        }

        console.log('route="/" - (sensor)[GET]', Date());
        
        const data = await selectSensorsById(id);
        
        if (!data) {
            console.log('empty data');
            res.status(400).send('empty data');
        }else{
            res.status(200).json(data);
        }
    } catch (error) {
        
        res.status(400).send('error');
        console.log(error);
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