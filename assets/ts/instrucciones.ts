import { countEjecuciones } from "./router_express";
import { guia } from "./guia";
import { nodoGuia } from "./nodoGuia";
import { nodoCopia } from "./nodoCopia";

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

  /* ERROR */
  ERROR: 'OP_ERROR',
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
  if(operandoDer === "undefined"){
    return{
      /* PARA JSTREE */    
      text: "Operacion",
      state:{opened:true},
      children: [
        {
          text: "Tipo",
          state:{opened:true},
          children: [
            {
              text:tipo,
              state:{opened:true}
            }
          ]
        },{
          text:"Operador",
          state:{opened:true},
          children: [operandoIzq]
        }
      ],
      /* DATOS CLASICOS */
      operandoIzq: [operandoIzq],
      operandoDer: operandoDer,
      tipo: tipo
    }
  }else{
    return{
      /* PARA JSTREE */    
      text: "Operacion",
      state:{opened:true},
      children: [
        {
          text: "Tipo",
          state:{opened:true},
          children: [
            {
              text:tipo,
              state:{opened:true}
            }
          ]
        },{
          text:"Operador Izquierdo",
          state:{opened:true},
          children: [operandoIzq]
        },{
          text:"Operador Derecho",
          state:{opened:true},
          children: [operandoDer]
        }
      ],
      /* DATOS CLASICOS */
      operandoIzq: operandoIzq,
      operandoDer: operandoDer,
      tipo: tipo
    }
  }  
}

function nuevaLlamadaFuncion(id:any,parametros:any){
  return{
    /* PARA JSTREE */
    text:"Llamada a Funcion",
    state:{opened:true},
    children: [
      {
        text: "Identificador",
        state:{opened:true},
        children:[
          {
            text:id,
            state:{opened:true}
          }
        ]        
      },{
        text:"Parametros",
        state:{opened:true},
        children: parametros
      }   
    ],
    /* DATOS CLASICOS */
    id: id,
    parametros: parametros
  }
}

/* OBJ PARA CLASE */
function nuevaClase(id:any, instrucciones:any){
  if(countEjecuciones === 1){
    guia.addGuia(new nodoGuia(undefined,id,undefined,"Clase",undefined,instrucciones));
  }else{
    guia.esCopia(new nodoCopia(undefined,id,undefined,"Clase",undefined,instrucciones));
  }

  return{
    /* PARA JSTREE */
    text:"Clase",
    state:{opened:true},
    children: [ 
      { 
        text: "Identificador",        
        state:{opened:true},
        children: [
          {
            text: id,
            state:{opened:true}
          }
        ]
      },{
        text:"Instrucciones",
        state:{opened:true},
        children: instrucciones
      }
    ],
    /* DATOS CLASICOS */
    tipo:  TIPO_INSTRUCCION.CLASS,
    id: id,
    instrucciones: instrucciones
  }
}

export const instruccionesAPI = {
  /* OBJ PARA NEGACION */
  nuevaNegacion: function(interior:any){
    return{
      text: "Not",
      state:{opened:true},
      children: [
        interior
      ]
    }
  },

  /* OBJ PARA EVITAR EL ERROR */
  nuevoError: function(error:any){
    return{
      text: "Error",
      state:{opened:true},
      icon: "https://png-4.findicons.com/files/icons/1014/ivista/16/error.png",
      children:[
        {
          text:error,
          state:{opened:true},
          icon: "https://png-4.findicons.com/files/icons/1014/ivista/16/error.png"
        }
      ]

    }
  },
  /* OBJ PARA RETURN */
  nuevoReturn: function(valor:any){
    return{
      /* PARA JSTREE */
      text: "Return",
      state:{opened:true},
      children: [      
        valor
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_TRANSFERENCIA.RETURN,
      valor: valor
    }
  },

  /* OBJ PARA BLOQUE DE SENTENCIAS */
  nuevoBloqueSentencias: function(instrucciones:any){
    return{
      /* PARA JSTREE */
      text: "Bloque de Sentencias",
      state:{opened:true},
      children: instrucciones,
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.BLOQUE_SENTENCIAS,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA ASIGNACION DE VARIABLES */
  nuevaAsignacion: function(identificador:any, valor:any){
    return{
      /* PARA JSTREE */
      text:"Asignacion",
      state:{opened:true},
      children: [
        {
          text: identificador,
          state:{opened:true},
          children: [           
              valor                  
          ]
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.ASIGNACION,
      identificador: identificador,
      valor: valor
    }
  },

  /* OBJ PARA HACER IMPORTS */
  nuevoImport: function(identificador:any){
    return{
      /* DATOS PARA JSTREE */
      text: "Import",
      state:{opened:true},
      children: [
        {
          text:identificador,
          state:{opened:true}
        }
      ],
      /* DATOS CLASICOS */
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
      /* DATOS PARA JSTREE */
      text: "Parametro",  
      state:{opened:true},    
      children: [
        parametro
      ],
      /* DATOS CLASICOS */
      parametro: parametro
    }
  },

  /* OBJ PARAMETRO DE FUNCION */
  nuevoParametroFun: function(tipo:any,parametro:any){
    return{
      /* DATOS PARA JSTREE */
      text: "Parametro",
      state:{opened:true},
      children: [
        {
          text: "Tipo",
          state:{opened:true},
          children: [
            {
              text: tipo,
              state:{opened:true}
            }
          ]
        },
        parametro
      ],
      /* DATOS CLASICOS */
      tipo: tipo,
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
      /* PARA JSTREE */
      text: tipo,
      state:{opened:true},
      children: [
        {
          text: valor,
          state:{opened:true}
        }
      ],
      /* DATOS CLASICOS */
      tipo: tipo,
      valor: valor
    }
  },

  /* OBJ OPERACION CON UN VALOR */
  nuevaOperacionUnaria: function(operando:any,tipo:any){
    return nuevaOperacion(operando,"undefined",tipo);
  },

  /* OBJ PARA OPERACION CON DOS VALORES */
  nuevaOperacionBinaria: function (operandoIzq:any, operandoDer:any, tipo:any){
    return nuevaOperacion(operandoIzq, operandoDer, tipo);
  },

  /* OBJ PARA DECLARACION DE FUNCIONES */
  nuevaDeclaracionFun: function (tipoFun:any, identificador:any, instrucciones:any){
    if(countEjecuciones === 1){
      guia.addGuia(new nodoGuia(tipoFun,identificador,undefined,"Funcion",undefined,instrucciones));
    }else{
      guia.esCopia(new nodoCopia(tipoFun,identificador,undefined,"Funcion",undefined,instrucciones.children));
    }

    return{
      /* PARA JSTREE */
      text: "Funcion",
      state:{opened:true},
      children: [
        {
          text: "Tipo",
          state:{opened:true},
          children:[
            {
              text: tipoFun,
              state:{opened:true}
            }
          ]
        },{
          text: "Identificador",
          state:{opened:true},
          children: [{
            text:identificador
          }]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children:[instrucciones]
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.DECLARACION_FUN,
      tipoFun: tipoFun,
      identificador: identificador,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA DECLARACION DE FUNCIONES */
  nuevaDeclaracionFunParametros: function (tipoFun:any, identificador:any, parametros:any, instrucciones:any){
    if(countEjecuciones === 1){
      guia.addGuia(new nodoGuia(tipoFun,identificador,undefined,"Funcion",parametros,instrucciones.children));
    }else{
      guia.esCopia(new nodoCopia(tipoFun,identificador,undefined,"Funcion",parametros,instrucciones.children));
    }

    return{
      /* PARA JSTREE */
      text: "Funcion",
      state:{opened:true},
      children: [
        {
          text: "Tipo",
          state:{opened:true},
          children:[
            {
              text: tipoFun,
              state:{opened:true}
            }
          ]
        },{
          text: "Identificador",
          state:{opened:true},
          children: [
            {
              text: identificador,
              state:{opened:true}
            }
          ]
        },{
          text: "Parametros",
          state:{opened:true},
          children: parametros
        },{
          text: "Instrucciones",
          state:{opened:true},
          children:[instrucciones]
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.DECLARACION_FUN,
      tipoFun: tipoFun,
      identificador: identificador,
      parametros: parametros,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA DECLARACION DE VARIABLES CON VALOR */
  nuevoDeclaracionVarValor: function(identificadores:any, tipo:any, valor:any){
    if(countEjecuciones === 1){
      guia.addGuia(new nodoGuia(tipo,identificadores,undefined,"Variable",undefined,undefined));
    }else{
      guia.esCopia(new nodoCopia(tipo,identificadores,undefined,"Variable",undefined,undefined));
    }

    return{
        /* PARA JSTREE */
        text: "Variable",
        state:{opened:true},
        children:[
          {
            text:"Tipo",
            state:{opened:true},
            children:[
              {
                text: tipo,
                state:{opened:true}
              }
            ]
          },{
            text:"Identificadores",
            state:{opened:true},
            children: identificadores
          },{
            text: "Valor",
            state:{opened:true},
            children: [valor]
          }
        ],
        /* DATOS CLASICOS */
        tipo: TIPO_INSTRUCCION.DECLARACION_VAR,
        identificadores: identificadores,
        tipo_dato: tipo,
        valor: valor
    }
  },

  /* OBJ PARA DECLARACION DE VARIABLES VACIAS*/
  nuevoDeclaracionVar: function(identificadores:any, tipo:any){
    if(countEjecuciones === 1){
      guia.addGuia(new nodoGuia(tipo,identificadores,undefined,"Variable",undefined,undefined));
    }else{
      guia.esCopia(new nodoCopia(tipo,identificadores,undefined,"Variable",undefined,undefined));
    }
    return{
      /* PARA JSTREE */
      text: "Variable",
      state:{opened:true},
        children:[
          {
            text:"Tipo",
            state:{opened:true},
            children:[
              {
                text: tipo,
                state:{opened:true},
              }
            ]
          },{
            text:"Identificadores",
            state:{opened:true},
            children: identificadores
          }
        ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.DECLARACION_VAR,
      identificadores: identificadores,
      tipo_dato: tipo
    }
  },

  /* OBJ PARA INSTRUCCION PRINT */
  nuevoPrint: function(expresionCadena:any){
    return{
      /* PARA JSTREE */
      text: "System.out.print",
      state:{opened:true},
      children: [expresionCadena],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.PRINT,
      expresionCadena: expresionCadena
    }
  },

  /* OBJ PARA INSTRUCCION PRINTLN */
  nuevoPrintln: function(expresionCadena:any){
    return{
      /* PARA JSTREE */
      text: "System.out.println",
      state:{opened:true},
      children: [expresionCadena],
      /* DATOS CLASICOS */
      tipo:TIPO_INSTRUCCION.PRINTLN,
      expresionCadena: expresionCadena
    }
  },

  /* OBJ PARA INSTRUCCION DO WHILE */
  nuevoDoWhile: function(expresionLogica:any, instrucciones:any){
    return{
      /* PARA JSTREE */
      text:"Do While",
      state:{opened:true},
      children:[
        {
          text: "Condicion",
          state:{opened:true},
          children: [expresionLogica]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children: [instrucciones]
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.DO_WHILE,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA INSTRUCCION WHILE */
  nuevoWhile: function (expresionLogica:any, instrucciones:any) {
      return{
        /* PARA JSTREE */
        text: "While",
        state:{opened:true},
        children: [
          {
            text: "Condicion",
            state:{opened:true},
            children: [expresionLogica]
          },{
            text:"Instrucciones",
            state:{opened:true},
            children: [instrucciones]
          }
        ],
        /* DATOS CLASICOS */
        tipo: TIPO_INSTRUCCION.WHILE,
        expresionLogica: expresionLogica,
        instrucciones: instrucciones
      }
  },

  /* OBJ PARA INSTRUCCION FOR */
  nuevoFor: function (variable:any, val:any, expresionLogica:any, aod:any, instrucciones:any) {
    return{
      /* PARA JSTREE */
      text: "For",
      state:{opened:true},
      children: [
        {
          text: "Condiciones",
          state:{opened:true},
          children:
          [
            {
              text: "Variable",
              state:{opened:true},
              children: [
                {
                  text: variable,
                  state:{opened:true},
                  children: [
                    val                  
                  ]
                }
              ]
            },{
              text: "Expresion logica",
              state:{opened:true},
              children: [expresionLogica]
            },{
              text: "Incremento/Decremento",
              state:{opened:true},
              children:[variable + aod]
            }
          ]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children: [instrucciones]
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.FOR,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones,
      aumentodecremento: aod,
      variable: variable,
      valor: val
    }
  },

  /* OBJ PARA INSTRUCCION IF */
  nuevoIf: function (expresionLogica:any, instrucciones:any) {
    return{
      /* PARA JSTREE */
      text: "If",
      state:{opened:true},
      children:[
        {
          text: "Condicion",
          state:{opened:true},
          children: [expresionLogica]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children: [instrucciones]
        }
      ],
      /* DATOS CLASICOS */
      tipo:TIPO_INSTRUCCION.IF,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA INSTRUCCION ELSE */
  nuevoElse: function (expresionLogica:any, instruccionesTrue:any, instruccionesFalse:any) {
    return{
      /* PARA JSTREE */
      text: "If",
      state:{opened:true},
      children:[
        {
          text: "Condicion",
          state:{opened:true},
          children: [expresionLogica]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children: [instruccionesTrue]
        },{
          text: "Else",
          state:{opened:true},
          children: [
            {
              text:"Instrucciones",
              state:{opened:true},
              children: [instruccionesFalse]
            }
          ]
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.ELSE,
      expresionLogica: expresionLogica,
      instruccionesTrue: instruccionesTrue,
      instruccionesFalse: instruccionesFalse
    }
  },

  /* OBJ PARA LA LISTA DE ELSE IF */
  nuevoIfListElseIf: function(expresionLogica:any, instrucciones:any, list_elseif:any){
    return{
      /* PARA JSTREE */
      text: "If",
      state:{opened:true},
      children:[
        {
          text:"Condicion",
          state:{opened:true},
          children: [expresionLogica]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children:  instrucciones
        },{
          text: "Lista Else If",
          state:{opened:true},
          children: list_elseif
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.IF,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones,
      list_elseif: list_elseif
    }
  },

  /* OBJ PARA LA LISTA DE ELSE IF CUANDO EXISTE UN ELSE */
  nuevoIfElseListElseIf: function(expresionLogica:any, instruccionesTrue:any, instruccionesFalse:any, list_elseif:any){
    return{
      /* PARA JSTREE */
      text: "If",
      state:{opened:true},
      children:[
        {
          text:"Condicion",
          state:{opened:true},
          children: [expresionLogica]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children:  [instruccionesTrue]
        },{
          text: "Lista Else If",
          state:{opened:true},
          children: list_elseif
        },{
          text: "Else",
          state:{opened:true},
          children: [instruccionesFalse]
        }
      ],
      /* DATOS CLASICOS */
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
      /* PARA JSTREE */
      text: "Else if",
      state:{opened:true},
      children: [
        {
          text: "Condicion",
          state:{opened:true},
          children: [expresionLogica]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children: instrucciones
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.ELSE_IF,
      expresionLogica: expresionLogica,
      instrucciones: instrucciones
    }
  },

  /* OBJ PARA LA INSTRUCCION SWITCH */
  nuevoSwitch: function(expresionNumerica:any,casos:any){
    return {
      /* PARA JSTREE */
      text: "Switch",
      state:{opened:true},
      children:[
        {
          text: "Expresion",
          state:{opened:true},
          children: [expresionNumerica]
        },{
          text: "Casos",
          state:{opened:true},
          children: casos
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_INSTRUCCION.SWITCH,
      expresionNumerica: expresionNumerica,
      casos: casos
    }
  },

  /* OBJ CASE PARA SWITCH */
  nuevoCase: function(expresion:any, instrucciones:any){
    return{
      /* PARA JSTREE */
      text: "Case",
      state:{opened:true},
      children:[
        {
          text: "Expresion",
          state:{opened:true},
          children: [expresion]
        },{
          text: "Instrucciones",
          state:{opened:true},
          children: instrucciones
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_TRANSFERENCIA.CASE,
      expresion: expresion,
      instrcciones: instrucciones
    }
  },

  /* OBJ DEFAULT PARA SWITCH */
  nuevoDefault: function(instrucciones:any){
    return {
      /* PARA JSTREE */
      text: "Default",
      state:{opened:true},
      children:[
        {
          text: "Instrucciones",
          state:{opened:true},
          children: instrucciones
        }
      ],
      /* DATOS CLASICOS */
      tipo: TIPO_TRANSFERENCIA.DEFAULT,
      instrucciones: instrucciones
    }
  },

  /* CREAR OBJ DE TIPO OPERADOR */
  nuevoOperador: function(operador:any){
    return operador
  }
}
