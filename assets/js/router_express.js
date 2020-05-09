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
router.post('/analizar/', (req, res) => {
    var entrada = req.body.text;
    var resultado = parser(entrada);
    errores_1.errores.clear();
    res.send(resultado.toString());
});
function parser(texto) {
    try {
        return analizador.parse(texto);
    }
    catch (er) {
        return "Error en compilacion de entrada: " + er.toString();
    }
}
exports.default = router;
