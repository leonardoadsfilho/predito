# predito

rotas para requisição 

GET /
        return an sensors array

GET /:id 
        send an parameter id, must be an integer and positive
        return an sensor if OK or an error 

POST /create
        send body in the fourmat JSON => 
            {
                "size": [?,?,?], // ? equals an array of floats like [1.2,1.2,1.2] NOT NULL
                "voltage": ?, // ? equals an float like 1.2 NOT NULL
                "brand": ?, // ? equals an string like "MARK2" NOT NULL
                "type": ?, // ? equals an string like "temperature" NOT NULL
                "last_measurement": ? // ? equals an string becouse the values shift with the type. like "27C°" or "26KG"
                "localization": {
                    "x": ?, // ? equals an float for point(x,...) datatype postgresql, and x is th x position in GPS
                    "y": ?, // ? equals an float for point(...,y) datatype postgresql, and y is th y position in GPS
                }
            }
        return {
                    "new_sensor_id": ? // ? equals the new id
               }
               or an error

PUT /update
        send an body in the format JSON like create but with an obrigatory id => 
            {
                "id": ?, // equals an integer positive !!! obrigatory
                "size": [?,?,?], // ? equals an array of floats like [1.2,1.2,1.2] NOT NULL
                "voltage": ?, // ? equals an float like 1.2 NOT NULL
                "brand": ?, // ? equals an string like "MARK2" NOT NULL
                "type": ?, // ? equals an string like "temperature" NOT NULL
                "last_measurement": ? // ? equals an string becouse the values shift with the type. like "27C°" or "26KG"
                "localization": {
                    "x": ?, // ? equals an float for point(x,...) datatype postgresql, and x is th x position in GPS
                    "y": ?, // ? equals an float for point(...,y) datatype postgresql, and y is th y position in GPS
                }
            }

DELETE /delete 
        send an id like the GET /:id, must be an integer and positive
        return an error message or an success message.