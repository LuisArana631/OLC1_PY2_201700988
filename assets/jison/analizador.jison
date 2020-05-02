/* LEXICO */
%lex
%%

\s+ /*IGNORAR ESPACIOS EN BLANCO*/
"{" return 'LLAIZQ';
"}" return 'LLADER';
";" return 'PTCOMA';
"[" return 'CORIZQ';
"]" return 'CORDER';
"(" return 'PARIZQ';
")" return 'PARDER';
"=" return 'IGUAL';
"!=" return 'DISTINTO';
"<" return 'MENOR';
">" return 'MAYOR';

/lex
