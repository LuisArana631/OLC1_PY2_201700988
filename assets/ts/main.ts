//Config of express server
import Server from './server';

const server = Server.init(8000);

server.start(()=>{
    console.log('Servidor ejecutandose en el puerto 3000');
})
