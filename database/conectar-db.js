const { Connection } = require('tedious');

const config = {  
    server: process.env.DB_SERVER,  //update me
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USERNAME, //update me
            password: process.env.DB_PASSWORD  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: process.env.DB_DATABASE , //update me
        trustServerCertificate: true,
        rowCollectionOnRequestCompletion: true
    }
}; 


const conectarDB = () => {
    
    const connection = new Connection(config);
    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Conexion exitosa');
        }
        
    }); 
    
    return connection;
}


module.exports = {
    conectarDB
}