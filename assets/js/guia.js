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
}
