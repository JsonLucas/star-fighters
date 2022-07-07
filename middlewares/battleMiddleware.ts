import { NextFunction, Request, Response } from 'express';
import { getUserRepos } from '../api/services';
import { validateBody } from '../utils/bodyValidation';

const battleMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { status, message } = validateBody(body);
    if(status){
        try{
            const { firstUser, secondUser } = body;
            const firstUserRepos = await getUserRepos(firstUser);
            const secondUserRepos = await getUserRepos(secondUser);
            res.locals.fightersRepos = { firstUserRepos, secondUserRepos };
            res.locals.usernames = { firstUser, secondUser };
            next();
        }catch(e: any){
            if(e.response){
                return res.status(e.response.status).send(e.response.data.message);
            }
            res.sendStatus(500);
        }
        return;
    }
    res.status(422).send(message);
}

export default battleMiddleware;