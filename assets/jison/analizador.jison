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
";" return 'PTOCOMA';
":" return 'DOSPTS';
"(" return 'PARIZQ';
")" return 'PARDER';

/* NUMEROS */
[0-9]+\b return 'ENTERO';
[0-9]+"."[0-9]+\b return 'DECIMAL';

/* IDENTIFICADORES */
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

/* CADENAS */
\"[^\"]*\" { yytext = yytext.substr( 1 , yyleng-2 ); return 'CADENA'; }

<<EOF>> return 'EOF';

. {console.error('Este es un error léxico: ' + yytext + ', en la linea: '+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/* SINTACTICO */
/lex

%{
  const TIPO_VALOR = require('../js/instrucciones').TIPO_VALOR;
  const TIPO_OPERACION = require('../js/instrucciones').TIPO_OPERACION;
  const instruccionesAPI = require('../js/instrucciones').instruccionesAPI;
%}

%start ini
%%

ini
  :instrucciones EOF { return $1; };

instrucciones
  :instrucciones instruccion  { $1.push($2); $$ = $1; }
  |instruccion  { $$ = [$1]; };

instruccion
  /* INSTRUCCIONES DE PRINT Y PRINTLN */
  :RPRINTLN PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrintln($3); }
  |RPRINT PARIZQ expresion_cadena PARDER PTOCOMA { $$ = instruccionesAPI.nuevoPrint($3); };

expresion_cadena
  :expresion_cadena MAS expresion_cadena { $$ = instruccionesAPI.nuevaOperacionBinaria($1,$3,TIPO_OPERACION.SUMA); }
  |CADENA { $$ = instruccionesAPI.nuevoValor($1, TIPO_VALOR.CADENA); };
