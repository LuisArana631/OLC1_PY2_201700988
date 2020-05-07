import { Router,Request,Response } from 'express';
import { errores } from './errores';

const router = Router();

router.post('/analizar/', (req:Request,res:Response) => {
    console.log("Conectado");
    var entrada = req.body.text;
    var resultado = parser(entrada);
    errores.clear();
    res.send(resultado.toString());
});

function parser(texto:string){
    try{
        return "Listo";
    }catch (er){
        return "Error en compilacion de entrada: " + er.toString(); 
    }
}

export default router;