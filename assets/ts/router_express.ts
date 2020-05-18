import { Router,Request,Response, response } from 'express';
import { errores } from './errores';
import { guia } from './guia';
import * as analizador from '../jison/analizador';

const router = Router();
export var countEjecuciones:number = 0;

router.post('/analizar/', (req:Request,res:Response) => {
    errores.clear();
    var entrada = req.body.text;
    var resultado = parser(entrada);        
    res.send(resultado);
});

router.get('/errores/', (req:Request, res:Response) =>  {
    var resultado = getErrores();
    res.send(resultado);
});

router.get('/restablecer/', (req:Request, res:Response) => {
    countEjecuciones = 0;
    res.send("Restablecido " +countEjecuciones);
});

function parser(texto:string){
    try{
        countEjecuciones++;
        console.log(countEjecuciones);
        return analizador.parse(texto);
    }catch (er){
        return "Error en compilacion de entrada: " + er.toString(); 
    }
}

function getErrores(){
    try{
        return errores.getErrores();
    }catch(er){
        return "Error al enviar errores: " + er.toString();
    }
}

export default router;