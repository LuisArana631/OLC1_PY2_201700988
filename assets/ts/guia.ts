import { nodoGuia } from './nodoGuia';
import { nodoCopia } from './nodoCopia';
import { copias }  from './copias';

export class guia extends Array<nodoGuia>{
    constructor(){
        super();
    }

    public static addGuia(nodo:nodoGuia){
        this.prototype.push(nodo);
    }

    public static clear(){
        while(this.prototype.length > 0){
            this.prototype.pop();
        }
    }

    public static getLength():number{
        return this.prototype.length;
    }

    public static getGuia():Array<nodoGuia>{
        var aux:Array<nodoGuia> = new Array;

        this.prototype.forEach(guide => {            
            aux.push(guide);
        });

        return aux;
    }

    public static esCopia(revisar:nodoCopia):void{
        this.prototype.forEach(item => {            
            if(item.TipoCopia == "Variable"){                
                if(revisar.TipoCopia == "Variable" ){                    
                    if(item.Tipo == revisar.Tipo){                    
                        var verificarIdentificador = true;
                        item.Identificador.forEach(ident => {
                            revisar.Identificador.forEach(identifi => {
                                if(ident == identifi){
                                    copias.addCopia(new nodoCopia(revisar.Tipo,identifi,undefined,"Variable",undefined,undefined));
                                }
                            });
                        });                                          
                    }
                }                
            }else if(item.TipoCopia === "Funcion"){

            }else{

            }
        });        
    }

}