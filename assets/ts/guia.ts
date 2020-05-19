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
                        item.Identificador.forEach(ident => {
                            revisar.Identificador.forEach(identifi => {
                                if(ident == identifi){
                                    copias.addCopia(new nodoCopia(revisar.Tipo,identifi,undefined,"Variable",undefined,undefined));
                                }
                            });
                        });                                          
                    }
                }      

            }else if(item.TipoCopia == "Funcion"){
                var siSonParametros = true;
                if(revisar.TipoCopia == "Funcion"){
                    if(item.Tipo == revisar.Tipo){
                        if(item.Identificador == revisar.Identificador){                            
                            if(item.Param || revisar.Param){                                                  
                                if(item.CountParam == revisar.CountParam){
                                    var posI = 0;
                                    while(posI < item.CountParam){
                                        if(item.Param[posI].tipo == revisar.Param[posI].tipo){
                                            console.log("Mismo tipo: "+item.Param[posI].tipo);
                                            if(item.Param[posI].parametro == revisar.Param[posI].parametro){
                                                console.log("Son copias");
                                            }else{
                                                siSonParametros = false;            
                                            }                                    
                                        }else{
                                            siSonParametros = false;        
                                        }
                                        posI++;
                                    }                       
                                }else{
                                    siSonParametros = false;
                                }                                                                

                            }
                                if(siSonParametros){                                    
                                    copias.addCopia(revisar);
                                }   
                                                                                                                                                                    

                        }
                    }
                }
                
            }else{                
                if(revisar.TipoCopia == "Clase"){                    
                    if(revisar.Identificador == item.Identificador){                        
                        if(revisar.CountMetodos == item.CountMetodos){
                            copias.addCopia(revisar);
                        }
                    }
                }
            }
        });        
    }

}