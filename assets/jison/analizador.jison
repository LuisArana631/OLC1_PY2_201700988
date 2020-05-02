/* LEXICO */
%lex
%%

/* ESPACIO EN BLANCO */
\s+ /* IGNORAR */

/* COMENTARIOS */
comentarioMultilinea "/*"[^'*']*"*/" /* IGNORAR COMENTARIO */
comentario "//".* /* IGNORAR COMENTARIO */


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

/* CARACTERES ESPECIALES */
"{" return 'LLAVIZQ';
"}" return 'LLAVDER';
"[" return 'CORIZQ';
"]" return 'CORDER';
"=" return 'IGUAL';
";" return 'PTOCOMA';
":" return 'DOSPTS';
"(" return 'PARDER';
")" return 'PARIZQ';

/* LETRAS */
letra [a-zñA-ZÑ]+   /* IGNORAR LETRAS SOLAS */

/* VALORES BOOLEANOS */
booleano ("true"|"false") return 'BOOLEANO';

/* NUMEROS */
numero [0-9]+ return 'ENTERO';
decimal [0-9]+"."[0-9]+ return 'DECIMAL';

/* CHARS */
caracter "\'"("\\")?([a-zñA-ZÑ]|{numero})"\'"; return 'CARACTER';

/* IDENTIFICADORES */
id ({letra}|"_"+)({letra}|{numero}|"_")* return 'IDENTIFICADOR';

/* CADENAS */
cadena "\""[^"\""]*"\"" return {yytext = yytext.substr(1,yyleng-2); return 'CADENA';}

<<EOF>> return 'EOF';

. {console.error('Este es un error léxico: ' + yytext + ', en la linea: '+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/* SINTACTICO */
/lex

%start init

%%
