//Config of express server
import Server from './server';
import router from './router_express';


const server = Server.init(3000);

server.app.use( router );

server.start(()=>{
    console.log('Servidor ejecutandose en el puerto 3000');
})

