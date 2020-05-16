"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class nodoGuia {
    constructor(tipo, identificador, padre, tipoCopia, countParam, param, countMetodos) {
        this.tipo = tipo;
        this.identificador = identificador;
        this.padre = padre;
        this.tipoCopia = tipoCopia;
        this.countParam = countParam;
        this.param = param;
        this.countMetodos = countMetodos;
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
}
exports.nodoGuia = nodoGuia;
