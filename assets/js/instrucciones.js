"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIPO_VALOR = {
    NUMERO: 'VAL_NUMERO',
    IDENTIFICADOR: 'VAL_IDENTIFICADOR',
    CADENA: 'VAL_CADENA',
    BOOLEAN: 'VAL_BOOLEANO'
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
    IGUALDAD: 'OP_IGUALDAD',
    DISTINTO: 'OP_DISTINTO',
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
    ASIGNACION: 'IN_ASIGNACION',
    BLOQUE_SENTENCIAS: 'IN_BLOQUE_SENTENCIAS',
};
exports.TIPO_TRANSFERENCIA = {
    BREAK: 'TR_BREAK',
    CONTINUE: 'TR_CONTINUE',
    RETURN: 'TR_RETURN',
    DEFAULT: 'TR_DEFAULT',
    CASE: 'TR_CASE',
};
function nuevaOperacion(operandoIzq, operandoDer, tipo) {
    if (operandoDer === "undefined") {
        return {
            /* PARA JSTREE */
            text: "Operacion",
            children: [
                {
                    text: "Tipo",
                    children: [
                        {
                            text: tipo
                        }
                    ]
                }, {
                    text: "Operador",
                    children: [operandoIzq]
                }
            ],
            /* DATOS CLASICOS */
            operandoIzq: operandoIzq,
            operandoDer: operandoDer,
            tipo: tipo
        };
    }
    else {
        return {
            /* PARA JSTREE */
            text: "Operacion",
            children: [
                {
                    text: "Tipo",
                    children: [
                        {
                            text: tipo
                        }
                    ]
                }, {
                    text: "Operador Izquierdo",
                    children: [operandoIzq]
                }, {
                    text: "Operador Derecho",
                    children: [operandoDer]
                }
            ],
            /* DATOS CLASICOS */
            operandoIzq: operandoIzq,
            operandoDer: operandoDer,
            tipo: tipo
        };
    }
}
function nuevaLlamadaFuncion(id, parametros) {
    return {
        /* PARA JSTREE */
        text: "Llamada a Funcion",
        children: [
            {
                text: "Identificador",
                children: [
                    {
                        text: id
                    }
                ]
            }, {
                text: "Parametros",
                children: parametros
            }
        ],
        /* DATOS CLASICOS */
        id: id,
        parametros: parametros
    };
}
function nuevaClase(id, instrucciones) {
    return {
        /* PARA JSTREE */
        text: "Clase",
        children: [
            {
                text: "Identificador",
                children: [
                    {
                        text: id
                    }
                ]
            }, {
                text: "Instrucciones",
                children: instrucciones
            }
        ],
        /* DATOS CLASICOS */
        tipo: exports.TIPO_INSTRUCCION.CLASS,
        id: id,
        instrucciones: instrucciones
    };
}
exports.instruccionesAPI = {
    /* OBJ PARA RETURN */
    nuevoReturn: function (valor) {
        return {
            /* PARA JSTREE */
            text: "Return",
            children: [
                valor
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_TRANSFERENCIA.RETURN,
            valor: valor
        };
    },
    /* OBJ PARA BLOQUE DE SENTENCIAS */
    nuevoBloqueSentencias: function (instrucciones) {
        return {
            /* PARA JSTREE */
            text: "Bloque de Sentencias",
            children: instrucciones,
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.BLOQUE_SENTENCIAS,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA ASIGNACION DE VARIABLES */
    nuevaAsignacion: function (identificador, valor) {
        return {
            /* PARA JSTREE */
            text: "Asignacion",
            children: [
                {
                    text: identificador,
                    children: [
                        {
                            text: valor
                        }
                    ]
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.ASIGNACION,
            identificador: identificador,
            valor: valor
        };
    },
    /* OBJ PARA HACER IMPORTS */
    nuevoImport: function (identificador) {
        return {
            /* DATOS PARA JSTREE */
            text: "Import",
            children: [
                {
                    text: identificador
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.IMPORT,
            identificador: identificador
        };
    },
    /* OBJ PARA CLASES SIN INSTRUCCIONES */
    nuevaClase: function (identificador) {
        return nuevaClase(identificador, undefined);
    },
    /* OBJ PARA CLASES CON INSTRUCCIONES */
    nuevaClaseInstrucciones: function (identificador, instrucciones) {
        return nuevaClase(identificador, instrucciones);
    },
    /* OBJ PARA PARAMETROS */
    nuevoParametros: function (parametro) {
        return {
            /* DATOS PARA JSTREE */
            text: "Parametro",
            children: [
                parametro
            ],
            /* DATOS CLASICOS */
            parametro: parametro
        };
    },
    /* OBJ PARAMETRO DE FUNCION */
    nuevoParametroFun: function (tipo, parametro) {
        return {
            /* DATOS PARA JSTREE */
            text: "Parametro",
            children: [
                {
                    text: "Tipo",
                    children: [
                        {
                            text: tipo
                        }
                    ]
                },
                parametro
            ],
            /* DATOS CLASICOS */
            tipo: tipo,
            parametro: parametro
        };
    },
    /* OBJ PARA CREAR INSTANCIA VACIA */
    nuevaInstancia: function (id, parametros) {
        return nuevaLlamadaFuncion(id, parametros);
    },
    /* OBJ PARA CREAR INSTANCIA CON PARAMETROS */
    nuevaInstanciaParametros: function (id) {
        return nuevaLlamadaFuncion(id, undefined);
    },
    /* OBJ PARA CREAR UNA VARIABLE */
    nuevoValor: function (valor, tipo) {
        return {
            /* PARA JSTREE */
            text: tipo,
            children: [
                {
                    text: valor
                }
            ],
            /* DATOS CLASICOS */
            tipo: tipo,
            valor: valor
        };
    },
    /* OBJ OPERACION CON UN VALOR */
    nuevaOperacionUnaria: function (operando, tipo) {
        return nuevaOperacion(operando, "undefined", tipo);
    },
    /* OBJ PARA OPERACION CON DOS VALORES */
    nuevaOperacionBinaria: function (operandoIzq, operandoDer, tipo) {
        return nuevaOperacion(operandoIzq, operandoDer, tipo);
    },
    /* OBJ PARA DECLARACION DE FUNCIONES */
    nuevaDeclaracionFun: function (tipoFun, identificador, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "Funcion",
            children: [
                {
                    text: "Tipo",
                    children: [
                        {
                            text: tipoFun
                        }
                    ]
                }, {
                    text: "Identificador",
                    children: identificador
                }, {
                    text: "Instrucciones",
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.DECLARACION_FUN,
            tipoFun: tipoFun,
            identificador: identificador,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA DECLARACION DE FUNCIONES */
    nuevaDeclaracionFunParametros: function (tipoFun, identificador, parametros, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "Funcion",
            children: [
                {
                    text: "Tipo",
                    children: [
                        {
                            text: tipoFun
                        }
                    ]
                }, {
                    text: "Identificador",
                    children: [
                        {
                            text: identificador
                        }
                    ]
                }, {
                    text: "Parametros",
                    children: [parametros]
                }, {
                    text: "Instrucciones",
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.DECLARACION_FUN,
            tipoFun: tipoFun,
            identificador: identificador,
            parametros: parametros,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA DECLARACION DE VARIABLES CON VALOR */
    nuevoDeclaracionVarValor: function (identificadores, tipo, valor) {
        return {
            /* PARA JSTREE */
            text: "Variable",
            children: [
                {
                    text: "Tipo",
                    children: [
                        {
                            text: tipo
                        }
                    ]
                }, {
                    text: "Identificadores",
                    children: identificadores
                }, {
                    text: "Valor",
                    children: [valor]
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.DECLARACION_VAR,
            identificadores: identificadores,
            tipo_dato: tipo,
            valor: valor
        };
    },
    /* OBJ PARA DECLARACION DE VARIABLES VACIAS*/
    nuevoDeclaracionVar: function (identificadores, tipo) {
        return {
            /* PARA JSTREE */
            text: "Variable",
            children: [
                {
                    text: "Tipo",
                    children: [
                        {
                            text: tipo
                        }
                    ]
                }, {
                    text: "Identificadores",
                    children: identificadores
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.DECLARACION_VAR,
            identificadores: identificadores,
            tipo_dato: tipo
        };
    },
    /* OBJ PARA INSTRUCCION PRINT */
    nuevoPrint: function (expresionCadena) {
        return {
            /* PARA JSTREE */
            text: "System.out.print",
            children: [expresionCadena],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.PRINT,
            expresionCadena: expresionCadena
        };
    },
    /* OBJ PARA INSTRUCCION PRINTLN */
    nuevoPrintln: function (expresionCadena) {
        return {
            /* PARA JSTREE */
            text: "System.out.println",
            children: [expresionCadena],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.PRINTLN,
            expresionCadena: expresionCadena
        };
    },
    /* OBJ PARA INSTRUCCION DO WHILE */
    nuevoDoWhile: function (expresionLogica, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "Do While",
            children: [
                {
                    text: "Condicion",
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.DO_WHILE,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA INSTRUCCION WHILE */
    nuevoWhile: function (expresionLogica, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "While",
            children: [
                {
                    text: "Condicion",
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    children: [instrucciones]
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.WHILE,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA INSTRUCCION FOR */
    nuevoFor: function (variable, val, expresionLogica, aod, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "For",
            children: [
                {
                    text: "Condiciones",
                    children: [
                        {
                            text: "Variable",
                            children: [
                                {
                                    text: variable,
                                    children: [
                                        val
                                    ]
                                }
                            ]
                        }, {
                            text: "Expresion logica",
                            children: [expresionLogica]
                        }, {
                            text: "Incremento/Decremento",
                            children: [variable + aod]
                        }
                    ]
                }, {
                    text: "Instrucciones",
                    children: [instrucciones]
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.FOR,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones,
            aumentodecremento: aod,
            variable: variable,
            valor: val
        };
    },
    /* OBJ PARA INSTRUCCION IF */
    nuevoIf: function (expresionLogica, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "If",
            children: [
                {
                    text: "Condicion",
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    children: [instrucciones]
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.IF,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA INSTRUCCION ELSE */
    nuevoElse: function (expresionLogica, instruccionesTrue, instruccionesFalse) {
        return {
            /* PARA JSTREE */
            text: "If",
            children: [
                {
                    text: "Condicion",
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    children: [instruccionesTrue]
                }, {
                    text: "Else",
                    children: [
                        {
                            text: "Instrucciones",
                            children: [instruccionesFalse]
                        }
                    ]
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.ELSE,
            expresionLogica: expresionLogica,
            instruccionesTrue: instruccionesTrue,
            instruccionesFalse: instruccionesFalse
        };
    },
    /* OBJ PARA LA LISTA DE ELSE IF */
    nuevoIfListElseIf: function (expresionLogica, instrucciones, list_elseif) {
        return {
            /* PARA JSTREE */
            text: "If",
            children: [
                {
                    text: "Condicion",
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    children: instrucciones
                }, {
                    text: "Lista Else If",
                    children: list_elseif
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.IF,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones,
            list_elseif: list_elseif
        };
    },
    /* OBJ PARA LA LISTA DE ELSE IF CUANDO EXISTE UN ELSE */
    nuevoIfElseListElseIf: function (expresionLogica, instruccionesTrue, instruccionesFalse, list_elseif) {
        return {
            /* PARA JSTREE */
            text: "If",
            children: [
                {
                    text: "Condicion",
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    children: [instruccionesTrue]
                }, {
                    text: "Lista Else If",
                    children: list_elseif
                }, {
                    text: "Else",
                    children: [instruccionesFalse]
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.ELSE,
            expresionLogica: expresionLogica,
            instruccionesTrue: instruccionesTrue,
            instruccionesFalse: instruccionesFalse,
            list_elseif: list_elseif
        };
    },
    /* OBJ PARA LA INSTRUCCION ELSE IF */
    nuevoElseIf: function (expresionLogica, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "Else if",
            children: [
                {
                    text: "Condicion",
                    children: [expresionLogica]
                }, {
                    text: "Instrucciones",
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.ELSE_IF,
            expresionLogica: expresionLogica,
            instrucciones: instrucciones
        };
    },
    /* OBJ PARA LA INSTRUCCION SWITCH */
    nuevoSwitch: function (expresionNumerica, casos) {
        return {
            /* PARA JSTREE */
            text: "Switch",
            children: [
                {
                    text: "Expresion",
                    children: [expresionNumerica]
                }, {
                    text: "Casos",
                    children: casos
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_INSTRUCCION.SWITCH,
            expresionNumerica: expresionNumerica,
            casos: casos
        };
    },
    /* OBJ CASE PARA SWITCH */
    nuevoCase: function (expresion, instrucciones) {
        return {
            /* PARA JSTREE */
            text: "Case",
            children: [
                {
                    text: "Expresion",
                    children: [expresion]
                }, {
                    text: "Instrucciones",
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_TRANSFERENCIA.CASE,
            expresion: expresion,
            instrcciones: instrucciones
        };
    },
    /* OBJ DEFAULT PARA SWITCH */
    nuevoDefault: function (instrucciones) {
        return {
            /* PARA JSTREE */
            text: "Default",
            children: [
                {
                    text: "Instrucciones",
                    children: instrucciones
                }
            ],
            /* DATOS CLASICOS */
            tipo: exports.TIPO_TRANSFERENCIA.DEFAULT,
            instrucciones: instrucciones
        };
    },
    /* CREAR OBJ DE TIPO OPERADOR */
    nuevoOperador: function (operador) {
        return operador;
    }
};
