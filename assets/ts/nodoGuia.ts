export class nodoGuia{    
    private tipo:any;
    private identificador: any;
    private padre:any;
    private tipoCopia:string;
    private countParam:any;
    private param:any;
    private countMetodos:any;
    private instrucciones:any;

    constructor(tipo:any, identificador:any, padre:any, tipoCopia:any, param:any, instrucciones:any){
        this.tipo = tipo;
        this.identificador = identificador;
        this.padre = padre;
        this.tipoCopia = tipoCopia;

        if(param === undefined){
            this.countParam = undefined;
        }else{
            this.countParam = param.length;
        }

        this.param = param;

        if(instrucciones){
            this.countMetodos = instrucciones.length;
        }else{
            this.countMetodos = undefined;
        }
        
        this.instrucciones = instrucciones;
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
    get TipoCopia():string{
        return this.tipoCopia;
    }
    get CountParam():any{
        return this.countParam;
    }
    get Param():any{
        return this.param;
    }
    get CountMetodos():any{
        return this.countMetodos;
    }
    get Instrucciones():any{
        return this.instrucciones;
    }

}