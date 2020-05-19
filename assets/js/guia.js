"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoCopia_1 = require("./nodoCopia");
const copias_1 = require("./copias");
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
    static esCopia(revisar) {
        this.prototype.forEach(item => {
            if (item.TipoCopia == "Variable") {
                if (revisar.TipoCopia == "Variable") {
                    if (item.Tipo == revisar.Tipo) {
                        var verificarIdentificador = true;
                        item.Identificador.forEach(ident => {
                            revisar.Identificador.forEach(identifi => {
                                if (ident == identifi) {
                                    copias_1.copias.addCopia(new nodoCopia_1.nodoCopia(revisar.Tipo, identifi, undefined, "Variable", undefined, undefined));
                                }
                            });
                        });
                    }
                }
            }
            else if (item.TipoCopia === "Funcion") {
            }
            else {
            }
        });
    }
}
exports.guia = guia;
