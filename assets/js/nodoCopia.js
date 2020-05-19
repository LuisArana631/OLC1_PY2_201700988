"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class nodoCopia {
    constructor(tipo, identificador, padre, tipoCopia, param, instrucciones) {
        this.tipo = tipo;
        this.identificador = identificador;
        this.padre = padre;
        this.tipoCopia = tipoCopia;
        if (param === undefined) {
            this.countParam = 0;
        }
        else {
            this.countParam = param.length;
        }
        this.param = param;
        if (instrucciones) {
            this.countMetodos = instrucciones.length;
        }
        else {
            this.countMetodos = 0;
        }
        this.instrucciones = instrucciones;
    }
    get Tipo() {
        return this.tipo;
    }
    get Identificador() {
        return this.identificador;
    }
    get Padre() {
        return this.padre;
    }
    get TipoCopia() {
        return this.tipoCopia;
    }
    get CountParam() {
        return this.countParam;
    }
    get Param() {
        return this.param;
    }
    get CountMetodos() {
        return this.countMetodos;
    }
    get Instrucciones() {
        return this.instrucciones;
    }
}
exports.nodoCopia = nodoCopia;
