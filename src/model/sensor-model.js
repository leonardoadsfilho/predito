const pool = require('../config/postgre')

const selectSensors = () => {
    
    let data;

    pool.query('SELECT * FROM sensors ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error;
        }
        data = results.rows;
    });

    return data;
}

const selectSensorsById = (id) => {
    
    let data;

    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        data = results.rows;
    });

    return data;
} 

const createSensor = (size, tension, brand, type, last_measurement, localization) => {
    
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [,], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}