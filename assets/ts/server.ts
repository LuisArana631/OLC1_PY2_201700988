import express = require('express');
import cors = require('cors');
import bodyParser = require('body-parser');

export default class Server{
  public app:express.Application;
  public port:number;

  constructor(puerto:number){
    this.port = puerto;
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({extended:true}));
  }

  static init (puerto:number){
    return new Server(puerto);
  }

  start(callback: Function){
    this.app.listen(this.port, callback());    
  }

}
