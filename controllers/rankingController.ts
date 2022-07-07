import { Request, Response } from 'express';
import getRanking from '../database/queries/retrieve/ranking';
const rankingController = async (req: Request, res: Response) => {
    try{
        const { rows } = await getRanking();
        res.status(200).send(rows);
    }catch(e: any){
        console.log(e.message);
        res.sendStatus(500);
    }
}

export default rankingController;