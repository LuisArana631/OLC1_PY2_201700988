"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class nodoError {
    constructor(tipo, descripcion, linea) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea + 1;
    }
    get Tipo() {
        return this.tipo;
    }
    get Descripcion() {
        return this.descripcion;
    }
    get Linea() {
        return this.linea;
    }
}
exports.nodoError = nodoError;
