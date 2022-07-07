import { Request, Response, NextFunction } from "express";
import dbConnection from "../database/dbConnection";

const dbConnectionMiddlware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await dbConnection().connect();
        next();
    }catch(e: any){
        console.log(e.message);
        res.sendStatus(500);
    }
}

export default dbConnectionMiddlware;