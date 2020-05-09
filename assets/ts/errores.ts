import { nodoError } from './nodoError';

class errores extends Array<nodoError>{
    constructor(){
        super();
    }

    public static addError(err:nodoError){
        this.prototype.push(err);
    }

    public static clear(){
        while(this.prototype.length > 0){
            this.prototype.pop();
        }
    }

    public static getErrores():Array<nodoError>{
        var aux:Array<nodoError> = new Array;

        this.prototype.forEach(er => {            
            aux.push(er);
        });

        return aux;
    }
}

export {errores};