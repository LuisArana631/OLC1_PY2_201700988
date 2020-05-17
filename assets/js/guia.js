"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class guia extends Array {
    constructor() {
        super();
    }
    static addGuia(nodo) {
        this.prototype.push(nodo);
    }
    static clear() {
        while (this.prototype.length > 0) {
            this.prototype.pop();
        }
    }
    static getLength() {
        return this.prototype.length;
    }
    static getGuia() {
        var aux = new Array;
        this.prototype.forEach(guide => {
            aux.push(guide);
        });
        return aux;
    }
}
exports.guia = guia;
