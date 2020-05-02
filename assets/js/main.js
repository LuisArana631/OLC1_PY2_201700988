"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Config of express server
const server_1 = __importDefault(require("./server"));
const server = server_1.default.init(8000);
server.start(() => {
    console.log('Servidor ejecutandose en el puerto 3000');
});
