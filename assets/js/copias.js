"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class copias extends Array {
    constructor() {
        super();
    }
    static addCopia(nodo) {
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
    static getCopias() {
        var aux = new Array;
        this.prototype.forEach(copy => {
            aux.push(copy);
        });
        return aux;
    }
}
exports.copias = copias;
