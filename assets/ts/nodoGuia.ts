export class nodoGuia{    
    private tipo:any;
    private identificador: any;
    private padre:any;
    private tipoCopia:string;
    private countParam:any;
    private param:any;
    private countMetodos:any;

    constructor(tipo:any, identificador:any, padre:any, tipoCopia:any, countParam:any, param:any, countMetodos:any){
        this.tipo = tipo;
        this.identificador = identificador;
        this.padre = padre;
        this.tipoCopia = tipoCopia;
        this.countParam = countParam;
        this.param = param;
        this.countMetodos = countMetodos;
    }

    get Tipo():any{
        return this.tipo;
    }
    get Identificador():any{
        return this.identificador;
    }
    get Padre():any{
        return this.padre;
    }
    get TipoCopia():any{
        return this.tipoCopia;
    }

}