import { nodoGuia } from './nodoGuia';

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

    
}