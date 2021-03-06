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
        
        
//DATABASE

CREATE DATABASE sensor
    WITH 
    OWNER = "user"
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

// CREATE TABLE
 CREATE TABLE IF NOT EXISTS public.sensors
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    size real[] NOT NULL,
    voltage real NOT NULL,
    brand text COLLATE pg_catalog."default" NOT NULL,
    type text COLLATE pg_catalog."default" NOT NULL,
    last_measurement text COLLATE pg_catalog."default" DEFAULT 0,
    localization point,
    CONSTRAINT sensors_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.sensors
    OWNER to "user";
    
