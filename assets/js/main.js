"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Config of express server
const server_1 = __importDefault(require("./server"));
const router_express_1 = __importDefault(require("./router_express"));
const cors = require("cors");
const bodyParser = require("body-parser");
const server = server_1.default.init(8000);
server.app.use(router_express_1.default);
server.app.use(bodyParser.json());
server.app.use(cors());
server.app.use(bodyParser.urlencoded({ extended: true }));
server.start(() => {
    console.log('Servidor ejecutandose en el puerto 3000');
});
