import { nodoError } from './nodoError';

export class errores extends Array<nodoError>{
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
}