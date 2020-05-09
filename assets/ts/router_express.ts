import { Router,Request,Response, response } from 'express';
import { errores } from './errores';
import * as analizador from '../jison/analizador';

const router = Router();

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

function parser(texto:string){
    try{
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