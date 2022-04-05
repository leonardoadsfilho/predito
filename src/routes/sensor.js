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
        
        console.log(error)   
        res.status(400).send(error)
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
        
        console.log(error);
        res.status(400).send(error);
    }
});

router.post('/create', async (req, res) => {
    
    try {
        const {
            size,
            voltage,
            brand,
            type,
            last_measurement,
            localization
        } = req.body;

        if(!size || !voltage || !brand || !type){
            throw 'some empty field';
        }

        console.log('route="/create" - (sensor)[POST]', Date());

        const data = await createSensor(
                size, 
                voltage, 
                brand, 
                type, 
                last_measurement,
                !localization || !localization.x || !localization.y ? { x:null, y:null } : localization
            );

        if (!data) {
            console.log('sensor not created');
            res.status(400).send('sensor not created');
        }else{
            res.status(200).json(data);
        }

    } catch (error) {
        
        console.log(error);
        res.status(400).send(error);
    }
});

router.put('/update', async (req, res) => {
    try {
        const {
            id,
            size,
            voltage,
            brand,
            type,
            last_measurement,
            localization
        } = req.body;

        if(!id){
            throw 'no id provided';
        }

        if(!Number.isInteger(parseInt(id))){
            throw 'input is not a integer';
        }

        console.log('route="/update" - (sensor)[PUT]', Date());

        const sensor = await selectSensorsById(id);

        if(!sensor){
            throw `sensor ${id} not found`;
        }

        const data = await updateSensor(
                id,
                sensor,
                size, 
                voltage, 
                brand, 
                type, 
                last_measurement, 
                !localization || !localization.x || !localization.y ? { x:null, y:null } : localization
            );

        if (!data) {
            console.log('sensor not updated');
            res.status(400).send('sensor not updated');
        }else{
            res.status(200).json(data);
        }

    } catch (error) {
        
        console.log(error);
        res.status(400).send(error);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        
        console.log('route="/delete" - (sensor)[DELETE]', Date());

        const id = parseInt(req.params.id);

        if(!Number.isInteger(id)){
            throw 'input is not a integer';
        }

        const data = await deleteSensor(id);

        res.status(200).json(data);
    } catch (error) {
        
        console.log(error)
        res.status(400).send(error);
    }
});

module.exports = router;