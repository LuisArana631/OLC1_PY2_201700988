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
"+" return 'MAS';
"-" return 'MENOS';
"*" return 'MULTIPLICACION';
"/" return 'DIVISION';
"^" return 'POTENCIA';
"%" return 'MODULO';
"++" return 'INCREMENTO';
"--" return 'DECREMENTO';

/* OPERACIONES RELACIONALES */
"==" return 'IGUALDAD';
"!=" return 'DISTINTO';
">" return 'MAYOR';
">="  return 'MAYORIGUAL';
"<" return 'MENOR';
"<=" return 'MENORIGUAL';

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

. {console.error('Este es un error léxico: \"' + yytext + '\", en la linea: '+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%{
  const TIPO_VALOR = require('../js/instrucciones').TIPO_VALOR;
  const TIPO_OPERACION = require('../js/instrucciones').TIPO_OPERACION;
  const instruccionesAPI = require('../js/instrucciones').instruccionesAPI;
%}

/* ASOCIACION Y PRECEDENCIA */
%left 'MAS' 'MENOS'
%left 'MULTIPLICACION' 'DIVISION' 'POTENCIA' 'MODULO'
%left 'PARDER' 'PARIZQ'

/* SINTACTICO */
%start ini
%%

ini
  :instrucciones EOF { console.log($1); return $1; };

instrucciones
  :instrucciones instruccion  { $1.push($2); $$ = $1; }
  |instruccion  { $$ = [$1]; };

instruccion
  /* INSTRUCCIONES DE PRINT Y PRINTLN */
  :RPRINTLN PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrintln($3); }
  |RPRINT PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrint($3); }
  /* DEFINICION DE CLASES */
  |RCLASS IDENTIFICADOR LLAVIZQ instrucciones LLAVDER { $$ = instruccionesAPI.nuevaClaseInstrucciones($2,$4); }
  |RCLASS IDENTIFICADOR LLAVIZQ LLAVDER { $$ = instruccionesAPI.nuevaClase($2); }
  /* IMPORTAR CLASES */
  |RIMPORT IDENTIFICADOR PTOCOMA { $$ = instruccionesAPI.nuevoImport($2); }
  /* DECLARAR VARIABLES */
  |tipo_dato lista_id PTOCOMA { $$ = instruccionesAPI.nuevoDeclaracionVar($2,$1); }
  |tipo_dato lista_id IGUAL expresion_cadena PTOCOMA { $$ = instruccionesAPI.nuevoDeclaracionVarValor($2,$1,$4); }
  /* ASIGNACION DE VARIABLES */
  |IDENTIFICADOR IGUAL expresion_cadena { $$ = instruccionesAPI.nuevaAsignacion($1,$3); }
  /* SENTENCIA IF */
|RIF PARIZQ expresion_logica PARDER LLAVIZQ instrucciones LLAVDER lista_else_if RELSE LLAVIZQ instrucciones LLAVDER { $$ = instruccionesAPI.nuevoIfElseListElseIf($3,$6,$11,$8); }
  |RIF PARIZQ expresion_logica PARDER LLAVIZQ instrucciones LLAVDER lista_else_if { $$ = instruccionesAPI.nuevoIfListElseIf($3,$6,$8); }
  |RIF PARIZQ expresion_logica PARDER LLAVIZQ instrucciones LLAVDER RELSE LLAVIZQ instrucciones LLAVDER { $$ = instruccionesAPI.nuevoElse($3,$6,$10); }
  |RIF PARIZQ expresion_logica PARDER LLAVIZQ instrucciones LLAVDER { $$ = instruccionesAPI.nuevoIf($3,$6); }
  /* ERRORES */
  |error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); };

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

valor_numerico
  :ENTERO { $$ = instruccionesAPI.nuevoValor(Number($1),TIPO_VALOR.NUMERO); }
  |DECIMAL { $$ = instruccionesAPI.nuevoValor(Number($1),TIPO_VALOR.NUMERO); };

valor_booleano
  :RTRUE { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.BOOLEAN); }
  |RFALSE { $$ = instruccionesAPI.nuevoValor($1,TIPO_VALOR.BOOLEAN); };

expresion_logica
  :expresion_logica AND expresion_logica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.AND); }
  |expresion_logica OR expresion_logica { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.OR); }
  |NOT expresion_logica { $$ = instruccionesAPI.nuevaOperacionUnaria($2, TIPO_OPERACION.NOT); }
  |expresion_relacional { $$ = $1; };

expresion_relacional
  :expresion_relacional IGUALDAD expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.IGUALDAD); }
  |expresion_relacional DISTINTO expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.DISTINTO); }
  |expresion_relacional MAYOR expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR_QUE); }
  |expresion_relacional MENOR expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR_QUE); }
  |expresion_relacional MAYORIGUAL expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR_IGUAL); }
  |expresion_relacional MENORIGUAL expresion_relacional { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR_IGUAL); }
  |CADENA { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA); }
  |IDENTIFICADOR { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.IDENTIFICADOR); }
  |valor_numerico { $$ = $1; }
  |valor_booleano { $$ = $1; }
  |llamada { $$ = $1; };
