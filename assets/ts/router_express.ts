import { Router,Request,Response } from 'express';

const router = Router();

router.post('/analizar/', (req:Request,res:Response) => {
    res.json({
        ok:true,
        mensaje: 'Todo bien!'
    });
});

export default router;