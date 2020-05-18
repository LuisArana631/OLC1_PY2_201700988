"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errores_1 = require("./errores");
const analizador = __importStar(require("../jison/analizador"));
const router = express_1.Router();
exports.countEjecuciones = 0;
router.post('/analizar/', (req, res) => {
    errores_1.errores.clear();
    var entrada = req.body.text;
    var resultado = parser(entrada);
    res.send(resultado);
});
router.get('/errores/', (req, res) => {
    var resultado = getErrores();
    res.send(resultado);
});
router.get('/restablecer/', (req, res) => {
    exports.countEjecuciones = 0;
    res.send("Restablecido " + exports.countEjecuciones);
});
function parser(texto) {
    try {
        exports.countEjecuciones++;
        console.log(exports.countEjecuciones);
        return analizador.parse(texto);
    }
    catch (er) {
        return "Error en compilacion de entrada: " + er.toString();
    }
}
function getErrores() {
    try {
        return errores_1.errores.getErrores();
    }
    catch (er) {
        return "Error al enviar errores: " + er.toString();
    }
}
exports.default = router;
