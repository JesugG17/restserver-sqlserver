const { Request, TYPES } = require("tedious");
const { conectarDB } = require("./conectar-db");

const obtenerDatos = ( query, callback ) => {
    
    const connection = conectarDB();
    return new Promise((resolve, reject) => {
        connection.on('connect', () => {
            
            const request = new Request(query, (err, rowCount, rows) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                
            });
            
            connection.execSql( request );
            
        });
        
        connection.close();
    });
    
    
    
}

const insertarDatos = ( nombre, correo, callback) => {
    
    const connection = conectarDB();
    const query = 'INSERT Usuarios(nombre, correo) VALUES(@nombre, @correo)'
    
    return new Promise((resolve, reject) => {
        
        connection.on('connect', () => {
            
            const request = new Request(query, (err, rowCount, rows) => {
                
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
                
            });
            
            request.addParameter('nombre', TYPES.NVarChar, nombre);
            request.addParameter('correo', TYPES.NVarChar, correo);
            
            connection.execSql( request );
            
        });
        
        connection.close();
    });
    
}


module.exports = {
    obtenerDatos,
    insertarDatos
};