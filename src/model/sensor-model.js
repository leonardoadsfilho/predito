const pool = require('../config/postgre')

const selectSensors = () => {
    
    let data = [];

    pool.query('SELECT * FROM sensors ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error;
        }
        data = results.rows;
        console.log('data',data)
    });
    return data;
}

const selectSensorsById = (id) => {
    
    let data = [];

    pool.query('SELECT * FROM sensors WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        console.log('SELECT id', id);
        data = results.rows;
    });

    return data;
} 

const createSensor = (size, voltage, brand, type, last_measurement, localization) => {
    
    let data;

    pool.query('INSERT INTO sensors (size, voltage, brand, type, last_measurement, localization) '+ 
                            'VALUES ($1, $2, $3, $4, $5, $6)', 
                            [size, voltage, brand, type, last_measurement, localization], (error, results) => {
        if (error) {
          throw error;
        }
        console.log(results.rows[0].id, size, voltage, brand, type, last_measurement, localization);
        data = results.rows[0].id;
    })

    return data;
}

const updateSensor = (id, size, voltage, brand, type, last_measurement, localization) => {
    
    let data;

    pool.query(
        'UPDATE pessoas SET size = $2, voltage = $3, brand = $4, type = $5, last_measurement = $6, localization = $7 WHERE id = $1',
        [id, size, voltage, brand, type, last_measurement, localization],
        (error, result) => {
            if (error) {
                throw error;
            }
            console.log(id, 'updated');
            data = id;
    });
    return data;
}

const deleteSensor = (id) => {
    
    let data;

    pool.query('DELETE FROM pessoas WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        console.log(id, 'deleted');
        data = id;
    });

    return data;
}

module.exports = {
    selectSensors,
    selectSensorsById,
    createSensor,
    updateSensor,
    deleteSensor,
}