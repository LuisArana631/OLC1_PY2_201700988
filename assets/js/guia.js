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
            else if (item.TipoCopia == "Funcion") {
                var siSonParametros = true;
                if (revisar.TipoCopia == "Funcion") {
                    if (item.Tipo == revisar.Tipo) {
                        if (item.Identificador == revisar.Identificador) {
                            if (item.Param || revisar.Param) {
                                if (item.CountParam == revisar.CountParam) {
                                    var posI = 0;
                                    while (posI < item.CountParam) {
                                        if (item.Param[posI].tipo == revisar.Param[posI].tipo) {
                                            console.log("Mismo tipo: " + item.Param[posI].tipo);
                                            if (item.Param[posI].parametro == revisar.Param[posI].parametro) {
                                                console.log("Son copias");
                                            }
                                            else {
                                                siSonParametros = false;
                                            }
                                        }
                                        else {
                                            siSonParametros = false;
                                        }
                                        posI++;
                                    }
                                }
                                else {
                                    siSonParametros = false;
                                }
                            }
                            if (siSonParametros) {
                                copias_1.copias.addCopia(revisar);
                            }
                        }
                    }
                }
            }
            else {
                if (revisar.TipoCopia == "Clase") {
                    if (revisar.Identificador == item.Identificador) {
                        if (revisar.CountMetodos == item.CountMetodos) {
                            copias_1.copias.addCopia(revisar);
                        }
                    }
                }
            }
        });
    }
}
exports.guia = guia;
