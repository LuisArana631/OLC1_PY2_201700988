import { nodoCopia } from "./nodoCopia";

export class copias extends Array<nodoCopia>{
    constructor(){
        super();
    }

    public static addCopia(nodo:nodoCopia){
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

    public static getCopias():Array<nodoCopia>{
        var aux:Array<nodoCopia> = new Array;

        this.prototype.forEach(copy => {
            aux.push(copy);
        });

        return aux;
    }

}