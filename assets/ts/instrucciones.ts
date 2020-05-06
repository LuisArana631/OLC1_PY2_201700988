export const TIPO_VALOR = {
  NUMERO: 'VAL_NUMERO',
  IDENTIFICADOR: 'VAL_IDENTIFICADOR',
  CADENA: 'VAL_CADENA',
  BOOLEAN: 'VAL_BOOLEANO'
}

export const TIPO_OPERACION = {
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
}

export const TIPO_INSTRUCCION = {
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
}

export const TIPO_TRANSFERENCIA = {
  BREAK: 'TR_BREAK',
  CONTINUE: 'TR_CONTINUE',
  RETURN: 'TR_RETURN',
  DEFAULT: 'TR_DEFAULT',
  CASE: 'TR_CASE',
}

function nuevaOperacion (operandoIzq:any, operandoDer:any, tipo:any){
  return{
    operandoIzq: operandoIzq,
    operandoDer: operandoDer,
    tipo: tipo
  }
}

function nuevaLlamadaFuncion(id:any,parametros:any){
  return{
    id: id,
    parametros: parametros
  }
}

function nuevaClase(id:any, instrucciones:any){
  return{
    tipo:  TIPO_INSTRUCCION.CLASS,
    id: id,
    instrucciones: instrucciones
  }
}

export const instruccionesAPI = {
  /* OBJ PARA RETURN */
  nuevoReturn: function(valor:any){
    return{
      tipo: TIPO_TRANSFERENCIA.RETURN,
      valor: valor
    }
  },

  /* OBJ PARA BLOQUE DE SENTENCIAS */
  nuevoBloqueSentencias: function(instrucciones:any){
    return{
      tipo: TIPO_INSTRUCCION.BLOQUE_SENTENCIAS,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA ASIGNACION DE VARIABLES */
  nuevaAsignacion: function(identificador:any, valor:any){
    return{
      tipo: TIPO_INSTRUCCION.ASIGNACION,
      identificador: identificador,
      valor: valor
    }
  },

  /* OBJ PARA HACER IMPORTS */
  nuevoImport: function(identificador:any){
    return{
      tipo: TIPO_INSTRUCCION.IMPORT,
      identificador: identificador
    }
  },

  /* OBJ PARA CLASES SIN INSTRUCCIONES */
  nuevaClase: function(identificador:any){
    return nuevaClase(identificador, undefined);
  },

  /* OBJ PARA CLASES CON INSTRUCCIONES */
  nuevaClaseInstrucciones: function(identificador:any, instrucciones:any){
    return nuevaClase(identificador, instrucciones);
  },

  /* OBJ PARA PARAMETROS */
  nuevoParametros: function(parametro:any){
    return {
      parametro: parametro
    }
  },

  /* OBJ PARA CREAR INSTANCIA VACIA */
  nuevaInstancia: function(id:any, parametros:any){
    return nuevaLlamadaFuncion(id,parametros);
  },

  /* OBJ PARA CREAR INSTANCIA CON PARAMETROS */
  nuevaInstanciaParametros: function(id:any){
    return nuevaLlamadaFuncion(id,undefined);
  },

  /* OBJ PARA CREAR UNA VARIABLE */
  nuevoValor: function(valor:any, tipo:any){
    return {
      tipo: tipo,
      valor: valor
    }
  },

  /* OBJ OPERACION CON UN VALOR */
  nuevaOperacionUnaria: function(operando:any,tipo:any){
    return nuevaOperacion(operando,undefined,tipo);
  },

  /* OBJ PARA OPERACION CON DOS VALORES */
  nuevaOperacionBinaria: function (operandoIzq:any, operandoDer:any, tipo:any){
    return nuevaOperacion(operandoIzq, operandoDer, tipo);
  },

  /* OBJ PARA DECLARACION DE FUNCIONES */
  nuevaDeclaracionFun: function (){

  },

  /* OBJ PARA DECLARACION DE VARIABLES CON VALOR */
  nuevoDeclaracionVarValor: function(identificadores:any, tipo:any, valor:any){
    return{
        tipo: TIPO_INSTRUCCION.DECLARACION_VAR,
        identificadores: identificadores,
        tipo_dato: tipo,
        valor: valor
    }
  },

  /* OBJ PARA DECLARACION DE VARIABLES VACIAS*/
  nuevoDeclaracionVar: function(identificadores:any, tipo:any){
    return{
      tipo: TIPO_INSTRUCCION.DECLARACION_VAR,
      identificadores: identificadores,
      tipo_dato: tipo
    }
  },

  /* OBJ PARA INSTRUCCION PRINT */
  nuevoPrint: function(expresionCadena:any){
    return{
      tipo: TIPO_INSTRUCCION.PRINT,
      expresionCadena: expresionCadena
    }
  },

  /* OBJ PARA INSTRUCCION PRINTLN */
  nuevoPrintln: function(expresionCadena:any){
    return{
      tipo:TIPO_INSTRUCCION.PRINTLN,
      expresionCadena: expresionCadena
    }
  },

  nuevoDoWhile: function(expresionLogica:any, instrucciones:any){
    return{
      tipo: TIPO_INSTRUCCION.DO_WHILE,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA INSTRUCCION WHILE */
  nuevoWhile: function (expresionLogica:any, instrucciones:any) {
      return{
        tipo: TIPO_INSTRUCCION.WHILE,
        expresionLogica: expresionLogica,
        instrucciones: instrucciones
      }
  },

  /* OBJ PARA INSTRUCCION FOR */
  nuevoFor: function (variable:any, val:any, expresionLogica:any, aod:any, instrucciones:any) {
    return{
      tipo: TIPO_INSTRUCCION.FOR,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones,
      aod: aod,
      variable: variable,
      val: val
    }
  },

  /* OBJ PARA INSTRUCCION IF */
  nuevoIf: function (expresionLogica:any, instrucciones:any) {
    return{
      tipo:TIPO_INSTRUCCION.IF,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA INSTRUCCION ELSE */
  nuevoElse: function (expresionLogica:any, instruccionesTrue:any, instruccionesFalse:any) {
    return{
      tipo: TIPO_INSTRUCCION.ELSE,
      expresionLogica: expresionLogica,
      instruccionesTrue: instruccionesTrue,
      instruccionesFalse: instruccionesFalse
    }
  },

  /* OBJ PARA LA LISTA DE ELSE IF */
  nuevoIfListElseIf: function(expresionLogica:any, instrucciones:any, list_elseif:any){
    return{
      tipo: TIPO_INSTRUCCION.IF,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones,
      list_elseif: list_elseif
    }
  },

  /* OBJ PARA LA LISTA DE ELSE IF CUANDO EXISTE UN ELSE */
  nuevoIfElseListElseIf: function(expresionLogica:any, instruccionesTrue:any, instruccionesFalse:any, list_elseif:any){
    return{
      tipo: TIPO_INSTRUCCION.ELSE,
      expresionLogica: expresionLogica,
      instruccionesTrue: instruccionesTrue,
      instruccionesFalse: instruccionesFalse,
      list_elseif: list_elseif
    }
  },

  /* OBJ PARA LA INSTRUCCION ELSE IF */
  nuevoElseIf: function(expresionLogica:any, instrucciones:any){
    return{
      tipo: TIPO_INSTRUCCION.ELSE_IF,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA LA INSTRUCCION SWITCH */
  nuevoSwitch: function(expresionNumerica:any,casos:any){
    return {
      tipo: TIPO_INSTRUCCION.SWITCH,
      expresionNumerica: expresionNumerica,
      casos: casos
    }
  },

  /* OBJ CASE PARA SWITCH */
  nuevoCase: function(expresion:any, instrucciones:any){
    return{
      tipo: TIPO_TRANSFERENCIA.CASE,
      expresion: expresion,
      instrcciones: instrucciones
    }
  },

  /* OBJ CASE PARA SWITCH CON VALOR DE TRANSFERENCIA */
  nuevoCaseTransferencia: function(expresion:any, instrucciones:any, transferencia:any){
    return{
      tipo: TIPO_TRANSFERENCIA.CASE,
      expresion: expresion,
      instrucciones: instrucciones,
      transferencia: transferencia
    }
  },

  /* OBJ DEFAULT PARA SWITCH */
  nuevoDefault: function(instrucciones:any){
    return {
      tipo: TIPO_TRANSFERENCIA.DEFAULT,
      instrucciones: instrucciones
    }
  },

  /* OBJ DEFAULT PARA SWITCH CON VALOR DE TRANSFERENCIA */
  nuevoDefaultTransferencia: function(instrucciones:any, transferencia:any){
    return{
      tipo: TIPO_TRANSFERENCIA.DEFAULT,
      instrucciones: instrucciones,
      transferencia: transferencia
    }
  },

  /* CREAR OBJ DE TIPO OPERADOR */
  nuevoOperador: function(operador:any){
    return operador
  }
}
