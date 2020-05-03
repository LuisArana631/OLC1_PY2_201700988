"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIPO_VALOR = {
    NUMERO: 'VAL_NUMERO',
    IDENTIFICADOR: 'VAL_IDENTIFICADOR',
    CADENA: 'VAL_CADENA',
};
exports.TIPO_OPERACION = {
    /*OPERACION ARITMETICA*/
    SUMA: 'OP_SUMA',
    RESTA: 'OP_RESTA',
    MULTIPLICACION: 'OP_MULTIPLICACION',
    DIVISION: 'OP_DIVISION',
    POTENCIA: 'OP_POTENCIA',
    MODULO: 'OP_MODULO',
    INCREMENTO: 'OP_INCREMENTO',
    DECREMENTO: 'OP_DECREMENTO',
    NEGATIVO: 'OP_NEGATIVO',
    /* OPERACIONES RELACIONALES */
    MAYOR_QUE: 'OP_MAYOR_QUE',
    MENOR_QUE: 'OP_MENOR_QUE',
    MAYOR_IGUAL: 'OP_MAYOR_IGUAL',
    MENOR_IGUAL: 'OP_MENOR_IGUAL',
    /* OPERACIONES LOGICAS */
    AND: 'OP_AND',
    OR: 'OP_OR',
    NOT: 'OP_NOT',
};
exports.TIPO_INSTRUCCION = {
    CLASS: 'IN_CLASS',
    IMPORT: 'IN_IMPORT',
    IF: 'IN_IF',
    ELSE_IF: 'IN_ELSE_IF',
    ELSE: 'IN_ELSE',
    SWITCH: 'IN_SWITCH',
    SWITCH_OP: 'IN_SWITCH_OP',
    SWITCH_DEF: 'IN_SWITCH_DEF',
    WHILE: 'IN_WHILE',
    DO: 'IN_DO',
    DO_WHILE: 'IN_DO_WHILE',
    FOR: 'IN_FOR',
    VOID: 'IN_VOID',
    PRINT: 'IN_PRINT',
    PRINTLN: 'IN_PRINTLN',
    DECLARACION_VAR: 'IN_DECLARACION_VAR',
    DECLARACION_FUN: 'IN_DECLARACION_FUN',
};
exports.TIPO_TRANSFERENCIA = {
    BREAK: 'TR_BREAK',
    CONTINUE: 'TR_CONTINUE',
    RETURN: 'TR_RETURN',
    DEFAULT: 'TR_DEFAULT',
    CASE: 'TR_CASE',
};
function nuevaOperacion(operandoIzq, operandoDer, tipo) {
    return {
        operandoIzq: operandoIzq,
        operandoDer: operandoDer,
        tipo: tipo
    };
}
exports.instruccionesAPI = {
    /* OBJ PARA CREAR UNA VARIABLE */
    nuevoValor: function (valor, tipo) {
        return {
            tipo: tipo,
            valor: valor
        };
    },
    /* OBJ OPERACION CON UN VALOR */
    nuevaOperacionUnaria: function (operando, tipo) {
        return nuevaOperacion(operando, undefined, tipo);
    },
    /* OBJ PARA OPERACION CON DOS VALORES */
    nuevaOperacionBinaria: function (operandoIzq, operandoDer, tipo) {
        return nuevaOperacion(operandoIzq, operandoDer, tipo);
    },
    /* OBJ PARA DECLARACION DE FUNCIONES */
    nuevaDeclaracionFun: function () {
    },
    /* OBJ PARA DECLARACION DE VARIABLES CON VALOR */
    nuevoDeclaracionVarItem: function (identificadores, tipo, valor) {
        return {
            tipo: exports.TIPO_INSTRUCCION.DECLARACION_VAR,
            identificadores: identificadores,
            tipo_dato: tipo,
            valor: valor
        };
    },
    /* OBJ PARA DECLARACION DE VARIABLES VACIAS*/
    nuevoDeclaracionVar: function (identificadores, tipo) {
        return {
            tipo: exports.TIPO_INSTRUCCION.DECLARACION_VAR,
            identificadores: identificadores,
            tipo_dato: tipo
        };
    },
    /* OBJ PARA INSTRUCCION PRINT */
    nuevoPrint: function (expresionCadena) {
        return {
            tipo: exports.TIPO_INSTRUCCION.PRINT,
            expresionCadena: expresionCadena
        };
    },
    /* OBJ PARA INSTRUCCION PRINTLN */
    nuevoPrintln: function (expresionCadena) {
        return {
            tipo: exports.TIPO_INSTRUCCION.PRINTLN,
            expresionCadena: expresionCadena
        };
    },
    /* OBJ PARA INSTRUCCION WHILE */
    nuevoWhile: function (expresionLogica, instrucciones) {
        return {
            tipo: exports.TIPO_INSTRUCCION.WHILE,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA INSTRUCCION FOR */
    nuevoFor: function (variable, val, expresionLogica, aod, instrucciones) {
        return {
            tipo: exports.TIPO_INSTRUCCION.FOR,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones,
            aod: aod,
            variable: variable,
            val: val
        };
    },
    /* OBJ PARA INSTRUCCION IF */
    nuevoIf: function (expresionLogica, instrucciones) {
        return {
            tipo: exports.TIPO_INSTRUCCION.IF,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA INSTRUCCION ELSE */
    nuevoElse: function (expresionLogica, instruccionesTrue, instruccionesFalse) {
        return {
            tipo: exports.TIPO_INSTRUCCION.ELSE,
            expresionLogica: expresionLogica,
            instruccionesTrue: instruccionesTrue,
            instruccionesFalse: instruccionesFalse
        };
    },
    /* OBJ PARA LA INSTRUCCION ELSE IF */
    nuevoElseIf: function (expresionLogica, instruccionesTrue, instruccionesFalse) {
        return {
            tipo: exports.TIPO_INSTRUCCION.ELSE_IF,
            expresionLogica: expresionLogica,
            instruccionesTrue: instruccionesTrue,
            instruccionesFalse: instruccionesFalse
        };
    },
    /* OBJ PARA LA INSTRUCCION SWITCH */
    nuevoSwitch: function (expresionNumerica, casos) {
        return {
            tipo: exports.TIPO_INSTRUCCION.SWITCH,
            expresionNumerica: expresionNumerica,
            casos: casos
        };
    },
    /* OBJ DE LA LISTA DE CASES */
    nuevoListCases: function (caso) {
        var casos = [];
        casos.push(caso);
        return casos;
    },
    /* OBJ CASE PARA SWITCH */
    nuevoCase: function (expresionNumerica, instrucciones) {
        return {
            tipo: exports.TIPO_TRANSFERENCIA.CASE,
            expresionNumerica: expresionNumerica,
            instrcciones: instrucciones
        };
    },
    /* OBJ DEFAULT PARA SWITCH */
    nuevoDefault: function (instrucciones) {
        return {
            tipo: exports.TIPO_TRANSFERENCIA.DEFAULT,
            instrucciones: instrucciones
        };
    },
    /* CREAR OBJ DE TIPO OPERADOR */
    nuevoOperador: function (operador) {
        return operador;
    }
};
