export class nodoError{
    private tipo:string;
    private descripcion:string;
    private linea:number;

    constructor(tipo:string, descripcion:string, linea:number){
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.linea = linea+1;
    }

    get Tipo():string{
        return this.tipo;
    }

    get Descripcion():string{
        return this.descripcion;
    }

    get Linea():number{
        return this.linea;
    }
}