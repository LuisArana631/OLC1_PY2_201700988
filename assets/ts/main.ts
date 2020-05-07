//Config of express server
import Server from './server';
import router from './router_express';
import cors = require('cors');
import bodyParser = require('body-parser');

const server = Server.init(8000);
server.app.use( router );
server.app.use(bodyParser.json());
server.app.use(cors());
server.app.use(bodyParser.urlencoded({extended:true}));

server.start(()=>{
    console.log('Servidor ejecutandose en el puerto 3000');
})

