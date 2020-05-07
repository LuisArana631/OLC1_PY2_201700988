"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errores_1 = require("./errores");
const router = express_1.Router();
router.post('/analizar/', (req, res) => {
    console.log("Conectado");
    var entrada = req.body.text;
    var resultado = parser(entrada);
    errores_1.errores.clear();
    res.send(resultado.toString());
});
function parser(texto) {
    try {
        return "Listo";
    }
    catch (er) {
        return "Error en compilacion de entrada: " + er.toString();
    }
}
exports.default = router;
