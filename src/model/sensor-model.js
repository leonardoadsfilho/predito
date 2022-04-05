const pool = require('../config/postgre')

const selectSensors = async () => {
   
    try {
        const {rows} = await pool.query('SELECT * FROM sensors ORDER BY id ASC');
        
        console.log('(SUCCESS) - SELECT * FROM sensors ORDER BY id ASC')
        
        return rows;
    } catch (error) {

        console.log('(ERROR) - SELECT * FROM sensors ORDER BY id ASC')
        console.log(error);

        throw 'error select sensors';    
    }
}

const selectSensorsById = async (id) => {
    
    try {
        const {rows} = await pool.query('SELECT * FROM sensors WHERE id = $1', [id]);

        console.log(`(SUCCESS) - SELECT * FROM sensors WHERE id = ${id}`)

        if(!rows){
            throw `sensor ${id} not found`;
        }else{
            return rows[0];
        }
    } catch (error) {
        
        console.log(`(ERROR) - SELECT * FROM sensors WHERE id = ${id}`)
        console.log(error)

        throw `error select sensor ${id}`;
    }
} 

const createSensor = async (size, voltage, brand, type, last_measurement, localization) => {
    
    try {
        const {rows} = await pool.query(`INSERT INTO sensors (size, voltage, brand, type, last_measurement, localization)
                                                    VALUES ($1, $2, $3, $4, $5, point($6, $7)) RETURNING *`, 
                            [size, voltage, brand, type, last_measurement, localization.x, localization.y]);

        console.log(`(SUCCESS) - CREATE sensors id = ${rows[0].id}`)

        return {new_sensor_id: rows[0].id};
    } catch (error) {
        
        console.log(`(ERROR) - CREATE sensors`);
        console.log(error);

        throw 'error CREATE sensor';
    }
}

const updateSensor = async (id, sensor, size, voltage, brand, type, last_measurement, localization) => {
    
    try {

        if(!sensor.localization){
            sensor.localization = {
                x:null,
                y:null
            }
        }

        const {rowCount} = await pool.query(
            `UPDATE sensors SET size = $2,
                                voltage = $3,
                                brand = $4,
                                type = $5,
                                last_measurement = $6, 
                                localization = point($7, $8) 
                                WHERE id = $1`,
            [
                id, 
                !size ? sensor.size : size, 
                !voltage ? sensor.voltage : voltage, 
                !brand ? sensor.brand : brand, 
                !type ? sensor.type : type, 
                !last_measurement ? sensor.last_measurement : last_measurement, 
                !localization.x ? sensor.localization.x : localization.x, 
                !localization.y ? sensor.localization.y : localization.y
            ]);

        console.log(`(SUCCESS) - UPDATE sensor id = ${id}`);  

        return `sensor ${id} updated`;
    } catch (error) {
        
        console.log(`(ERROR) - UPDATE sensor id = ${id}`);  
        console.log(error)

        throw 'error update';
    }
}

const deleteSensor = async (id) => {
    
    try {
        const {rowCount} = await pool.query('DELETE FROM sensors WHERE id = $1', [id]);

        console.log(`(SUCCESS) - DELETE sensor id = ${id}`);  

        if(rowCount > 0){
            return `sensor ${id} deleted`;
        }else{
            throw `sensor ${id} not found`;
        }
    } catch (error) {
        
        console.log(`(ERROR) - DELETE sensor id = ${id}`);  
        console.log(error)

        throw 'error delete';
    }
}

module.exports = {
    selectSensors,
    selectSensorsById,
    createSensor,
    updateSensor,
    deleteSensor,
}