/* LEXICO */
%lex
%%

/* ESPACIO EN BLANCO */
\s+ /* IGNORAR */

/* COMENTARIOS */
"//".* /* IGNORAR COMENTARIO */
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] /* IGNORAR COMENTARIO */

/* TIPOS DE DATOS */
"int" return 'RINT';
"double"  return 'RDOUBLE';
"boolean" return 'RBOOLEAN';
"char" return 'RCHAR';
"String" return 'RSTRING';

/* SECUENCIAS DE ESCAPE */
"\\n" return 'SALTOLINEA';
"\\t" return 'TABULADOR';
"\\r" return 'RETORNO';
"\\\\" return 'BARRAINVER';
"\\\"" return 'COMILLADOBLE';

/* OPERACIONES ARITMETICAS*/
"++" return 'INCREMENTO';
"--" return 'DECREMENTO';
"+" return 'MAS';
"-" return 'MENOS';
"*" return 'MULTIPLICACION';
"/" return 'DIVISION';
"^" return 'POTENCIA';
"%" return 'MODULO';

/* OPERACIONES RELACIONALES */
"==" return 'IGUALDAD';
"!=" return 'DISTINTO';
">="  return 'MAYORIGUAL';
">" return 'MAYOR';
"<=" return 'MENORIGUAL';
"<" return 'MENOR';

/* OPREACIONES LOGICAS */
"&&" return 'AND';
"||" return 'OR';
"!" return 'NOT';

/* PALABRAS RESERVADAS */
"class" return 'RCLASS';
"import" return 'RIMPORT';
"if" return 'RIF';
"else" return 'RELSE';
"switch" return 'RSWITCH';
"case" return 'RCASE';
"default" return 'RDEFAULT';
"break" return 'RBREAK';
"return" return 'RRETURN';
"while" return 'RWHILE';
"do" return 'RDO';
"for" return 'RFOR';
"continue" return 'RCONTINUE';
"void" return 'RVOID';
"System.out.println" return 'RPRINTLN';
"System.out.print" return 'RPRINT';
"public" return 'RPUBLIC';
"private" return 'RPRIVATE';
"protected" return 'RPROTECTED';
"static" return 'RSTATIC';
"main" return 'RMAIN';
"args" return 'RARGS';
"true" return 'RTRUE';
"false" return 'RFALSE';

/* CARACTERES ESPECIALES */
"{" return 'LLAVIZQ';
"}" return 'LLAVDER';
"[" return 'CORIZQ';
"]" return 'CORDER';
"=" return 'IGUAL';
"," return "COMA";
";" return 'PTOCOMA';
":" return 'DOSPTS';
"(" return 'PARIZQ';
")" return 'PARDER';

/* NUMEROS */
[0-9]+("."[0-9]+)?\b return 'DECIMAL';
[0-9]+\b return 'ENTERO';

/* IDENTIFICADORES */
([a-zA-Z_])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

/* CADENAS */
\"[^\"]*\" { yytext = yytext.substr( 1 , yyleng-2 ); return 'CADENA'; }

<<EOF>> return 'EOF';

. cErrores.errores.addError(new cNodoError.nodoError("Lexico","Caracter desconocido",yylloc.first_line,yytext))

/lex

%{
  const TIPO_VALOR = require('../js/instrucciones').TIPO_VALOR;
  const TIPO_OPERACION = require('../js/instrucciones').TIPO_OPERACION;
  const instruccionesAPI = require('../js/instrucciones').instruccionesAPI;
  const cErrores = require ('../js/errores');
  const cNodoError = require ('../js/nodoError');
%}

/* ASOCIACION Y PRECEDENCIA */
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION' 'POTENCIA' 'MODULO'
%left 'PARDER' 'PARIZQ'

/* SINTACTICO */
%start ini
%%

ini
  :instrucciones EOF { return $1; };

instrucciones
  :instrucciones instruccion  { $1.push($2); $$ = $1; }
  |instruccion  { $$ = [$1]; };

sentencias
  :sentencias sentencia { $1.push($2); $$ = $1; }
  |sentencia { $$ = [$1]; };

sentencia
  :RPRINTLN PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrintln($3); }
  |RPRINT PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrint($3); }
  |tipo_dato lista_id PTOCOMA { $$ = instruccionesAPI.nuevoDeclaracionVar($2,$1); }
  |tipo_dato lista_id IGUAL expresion_cadena PTOCOMA { $$ = instruccionesAPI.nuevoDeclaracionVarValor($2,$1,$4); }
  |IDENTIFICADOR IGUAL expresion_cadena { $$ = instruccionesAPI.nuevaAsignacion($1,$3); }
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias lista_else_if RELSE bloque_sentencias { $$ = instruccionesAPI.nuevoIfElseListElseIf($3,$5,$8,$6); }
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias lista_else_if { $$ = instruccionesAPI.nuevoIfListElseIf($3,$5,$6); }
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias RELSE bloque_sentencias { $$ = instruccionesAPI.nuevoElse($3,$5,$7); }
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoIf($3,$5); }
  |RSWITCH PARIZQ expresion_cadena PARDER LLAVIZQ casos LLAVDER { $$ = instruccionesAPI.nuevoSwitch($3,$6); }
  |RWHILE PARIZQ expresion_logica PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoWhile($3,$5); }
  |RDO bloque_sentencias RWHILE PARIZQ expresion_logica PARDER { $$ = instruccionesAPI.nuevoDoWhile($5,$2); }
  |RFOR PARIZQ RINT IDENTIFICADOR IGUAL valor_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR INCREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($4,$6,$8,$11,$14); }
  |RFOR PARIZQ RINT IDENTIFICADOR IGUAL valor_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR DECREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($4,$6,$8,$11,$14); }
  |RFOR PARIZQ IDENTIFICADOR IGUAL valo_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR INCREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($3,$5,$7,$10,$13); }
  |RFOR PARIZQ IDENTIFICADOR IGUAL valo_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR DECREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($3,$5,$7,$10,$13); }
  |RVOID IDENTIFICADOR PARIZQ PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFun($1,$2,$5); }
  |RVOID IDENTIFICADOR PARIZQ parametros_fun PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFunParametros($1,$2,$4,$6); }
  |tipo_dato IDENTIFICADOR PARIZQ PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFun($1,$2,$5); }
  |tipo_dato IDENTIFICADOR PARIZQ parametros_fun PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFunParametros($1,$2,$4,$6); }
  |incremento_decremento PTOCOMA { $$ = $1; }
  |valor_transferencia PTOCOMA { $$ = $1; };

instruccion
  /* INSTRUCCIONES DE PRINT Y PRINTLN */
  :RPRINTLN PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrintln($3); }
  |RPRINT PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrint($3); }
  /* DEFINICION DE CLASES */
  |RCLASS IDENTIFICADOR LLAVIZQ sentencias LLAVDER { $$ = instruccionesAPI.nuevaClaseInstrucciones($2,$4); }
  |RCLASS IDENTIFICADOR LLAVIZQ LLAVDER { $$ = instruccionesAPI.nuevaClase($2); }
  /* IMPORTAR CLASES */
  |RIMPORT IDENTIFICADOR PTOCOMA { $$ = instruccionesAPI.nuevoImport($2); }
  /* DECLARAR VARIABLES */
  |tipo_dato lista_id PTOCOMA { $$ = instruccionesAPI.nuevoDeclaracionVar($2,$1); }
  |tipo_dato lista_id IGUAL expresion_cadena PTOCOMA { $$ = instruccionesAPI.nuevoDeclaracionVarValor($2,$1,$4); }
  /* ASIGNACION DE VARIABLES */
  |IDENTIFICADOR IGUAL expresion_cadena { $$ = instruccionesAPI.nuevaAsignacion($1,$3); }
  /* SENTENCIA IF */
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias lista_else_if RELSE bloque_sentencias { $$ = instruccionesAPI.nuevoIfElseListElseIf($3,$5,$8,$6); }
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias lista_else_if { $$ = instruccionesAPI.nuevoIfListElseIf($3,$5,$6); }
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias RELSE bloque_sentencias { $$ = instruccionesAPI.nuevoElse($3,$5,$7); }
  |RIF PARIZQ expresion_logica PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoIf($3,$5); }
  /* SENTENCIA SWITCH */
  |RSWITCH PARIZQ expresion_cadena PARDER LLAVIZQ casos LLAVDER { $$ = instruccionesAPI.nuevoSwitch($3,$6); }
  /* SENTENCIA WHILE */
  |RWHILE PARIZQ expresion_logica PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoWhile($3,$5); }
  /* SENTENCIA DO WHILE */
  |RDO bloque_sentencias RWHILE PARIZQ expresion_logica PARDER { $$ = instruccionesAPI.nuevoDoWhile($5,$2); }
  /* SENTENCIA FOR */
  |RFOR PARIZQ RINT IDENTIFICADOR IGUAL valor_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR INCREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($4,$6,$8,$11,$14); }
  |RFOR PARIZQ RINT IDENTIFICADOR IGUAL valor_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR DECREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($4,$6,$8,$11,$14); }
  |RFOR PARIZQ IDENTIFICADOR IGUAL valo_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR INCREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($3,$5,$7,$10,$13); }
  |RFOR PARIZQ IDENTIFICADOR IGUAL valo_numerico PTOCOMA expresion_relacional PTOCOMA IDENTIFICADOR DECREMENTO PTOCOMA PARDER bloque_sentencias { $$ = instruccionesAPI.nuevoFor($3,$5,$7,$10,$13); }
  /* DECLARACION DE FUNCIONES */
  |RVOID IDENTIFICADOR PARIZQ PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFun($1,$2,$5); }
  |RVOID IDENTIFICADOR PARIZQ parametros_fun PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFunParametros($1,$2,$4,$6); }
  |tipo_dato IDENTIFICADOR PARIZQ PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFun($1,$2,$5); }
  |tipo_dato IDENTIFICADOR PARIZQ parametros_fun PARDER bloque_sentencias { $$ = instruccionesAPI.nuevaDeclaracionFunParametros($1,$2,$4,$6); }
  /* INCREMENTO Y DECREMENTO */
  |incremento_decremento PTOCOMA { $$ = $1; }
  /* ERRORES */
  |error { cErrores.errores.addError(new cNodoError.nodoError("Sintactico","No se esperaba el caracter: "+$1,this._$.first_line,$1)); };

expresion_cadena
  :expresion_cadena MAS expresion_cadena { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.SUMA); }
  |CADENA { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.CADENA); }
  |valor_booleano { $$ = $1; }
  |aux_expresion_cadena { $$ = $1; };

aux_expresion_cadena
  :aux_expresion_cadena MENOS aux_expresion_cadena { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.RESTA); }
  |aux_expresion_cadena MULTIPLICACION aux_expresion_cadena { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MULTIPLICACION); }
  |aux_expresion_cadena DIVISION aux_expresion_cadena { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.DIVISION); }
  |aux_expresion_cadena MODULO aux_expresion_cadena { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MODULO); }
  |aux_expresion_cadena POTENCIA aux_expresion_cadena { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.POTENCIA); }
  |incremento_decremento { $$ = $1; }
  |PARIZQ aux_expresion_cadena PARDER { $$ = $2; }
  |valor_numerico { $$ = $1; }
  |IDENTIFICADOR { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.IDENTIFICADOR); }
  |llamada { $$ = $1; };

llamada
  :IDENTIFICADOR PARIZQ parametros PARDER { $$ = instruccionesAPI.nuevaInstanciaParametros($1,$3); }
  |IDENTIFICADOR PARIZQ PARDER { $$ = instruccionesAPI.nuevaInstancia($1); };

expresion_numerica
  :expresion_numerica MAS expresion_numerica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.SUMA); }
  |expresion_numerica MENOS expresion_numerica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.RESTA); }
  |expresion_numerica MULTIPLICACION expresion_numerica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MULTIPLICACION); }
  |expresion_numerica DIVISION expresion_numerica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.DIVISION); }
  |expresion_numerica MODULO expresion_numerica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.MODULO); }
  |expresion_numerica POTENCIA expresion_numerica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.POTENCIA); }
  |PARIZQ expresion_numerica PARDER { $$ = $2; }
  |MENOS expresion_numerica { $$ = instruccionesAPI.nuevaOperacionUnaria($2, TIPO_OPERACION.NEGATIVO); }
  |incremento_decremento { $$ = $1; }
  |valor_numerico { $$ = $1; }
  |IDENTIFICADOR { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.IDENTIFICADOR); }
  |llamada { $$ = $1; };

parametros
  :parametros COMA parametro { $1.push($3); $$ = $1; }
  |parametro  { $$ = [$1]};

parametro
  :IDENTIFICADOR { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.IDENTIFICADOR); }
  |CADENA { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.CADENA); }
  |valor_numerico { $$ = $1; }
  |valor_booleano { $$ = $1; }
  |llamada { $$ = $1; };

tipo_dato
  :RINT { $$ = $1; }
  |RDOUBLE { $$ = $1; }
  |RBOOLEAN { $$ = $1; }
  |RCHAR { $$ = $1; }
  |RSTRING { $$ = $1; };

lista_id
  :lista_id COMA IDENTIFICADOR { $1.push($3);  $$ = $1; }
  |IDENTIFICADOR { $$ = [$1]; };

valor_transferencia
  :RBREAK { $$ = $1; }
  |RRETURN expresionCadena { $$ = instruccionesAPI.nuevoReturn($2); }
  |RCONTINUE { $$ = $1; };

valor_numerico
  :ENTERO { $$ = instruccionesAPI.nuevoValor(Number($1),TIPO_VALOR.NUMERO); }
  |DECIMAL { $$ = instruccionesAPI.nuevoValor(Number($1),TIPO_VALOR.NUMERO); };

valor_booleano
  :RTRUE { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.BOOLEAN); }
  |RFALSE { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.BOOLEAN); };

expresion_relacional
  :valores_expresion_relacional IGUALDAD valores_expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.IGUALDAD); }
  |valores_expresion_relacional DISTINTO valores_expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.DISTINTO); }
  |valores_expresion_relacional MAYOR valores_expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR_QUE); }
  |valores_expresion_relacional MENOR valores_expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR_QUE); }
  |valores_expresion_relacional MAYORIGUAL valores_expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR_IGUAL); }
  |valores_expresion_relacional MENORIGUAL valores_expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR_IGUAL); }
  |valores_expresion_relacional { $$ = $1; };

valores_expresion_relacional
  :CADENA { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA); }
  |valor_booleano { $$ = $1; }
  |expresion_numerica { $$ = $1; };

expresion_logica
  :expresion_logica AND expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.AND); }
  |expresion_logica OR expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.OR); }
  |NOT PARIZQ expresion_logica AND expresion_relacional PARDER { $$ = instruccionesAPI.nuevaOperacionUnaria(instruccionesAPI.nuevaOperacionBinaria($3,$5, TIPO_OPERACION.AND), TIPO_OPERACION.NOT); }
  |NOT PARIZQ expresion_logica OR expresion_relacional PARDER { $$ = instruccionesAPI.nuevaOperacionUnaria(instruccionesAPI.nuevaOperacionBinaria($3,$5, TIPO_OPERACION.OR), TIPO_OPERACION.NOT); }
  |NOT expresion_relacional { $$ = instruccionesAPI.nuevaOperacionUnaria($2, TIPO_OPERACION.NOT); }
  |expresion_relacional { $$ = $1; };

casos
  :casos caso_eval { $1.push($2); $$ =$1; }
  |caso_eval { $$ = [$1]; };

caso_eval
  :RCASE expresion_cadena DOSPTS sentencias { $$ = instruccionesAPI.nuevoCase($2,$4); }
  |RDEFAULT DOSPTS sentencias { $$ = instruccionesAPI.nuevoDefault($3); };

bloque_sentencias
  :LLAVIZQ sentencias LLAVDER { $$ = instruccionesAPI.nuevoBloqueSentencias($2); }
  |LLAVIZQ LLAVDER { $$ = instruccionesAPI.nuevoBloqueSentencias(undefined) };

lista_else_if
  :lista_else_if RELSE RIF PARIZQ expresion_logica PARDER bloque_sentencias { $1.push(instruccionesAPI.nuevoIf($5,$7)); $$ = $1; }
  |RELSE RIF PARIZQ expresion_logica PARDER bloque_sentencias { $$ = [instruccionesAPI.nuevoIf($4,$6)]; };

incremento_decremento
  :IDENTIFICADOR INCREMENTO { $$ = instruccionesAPI.nuevaOperacionUnaria($1,TIPO_OPERACION.INCREMENTO); }
  |IDENTIFICADOR DECREMENTO { $$ = instruccionesAPI.nuevaOperacionUnaria($1,TIPO_OPERACION.DECREMENTO); }
  |ENTERO INCREMENTO { $$ = instruccionesAPI.nuevaOperacionUnaria($1,TIPO_OPERACION.INCREMENTO); }
  |ENTERO DECREMENTO { $$ = instruccionesAPI.nuevaOperacionUnaria($1,TIPO_OPERACION.DECREMENTO); };

parametros_fun
  :parametros_fun COMA tipo_dato IDENTIFICADOR { $1.push(instruccionesAPI.nuevoParametroFun($3,$4)); $$ = $1 }
  |tipo_dato IDENTIFICADOR { $$ = [instruccionesAPI.nuevoParametroFun($1,$2)]; };
