import { nodoGuia } from './nodoGuia';

class guia extends Array<nodoGuia>{
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

    
}