const express = require('express');
const cors = require('cors');
class Server {
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            users: '/api/users'
        };

        this.middlewares();

        this.routes();

    }


    middlewares(){

        this.app.use( express.static('public') );
        this.app.use( express.json() );
        this.app.use( cors() );
    }

    routes() {

        this.app.use(this.paths.users, require('../routes/users.routes'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
     
    
}


module.exports = {
    Server
}