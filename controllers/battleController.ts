import { Request, Response } from 'express';
import setUser from '../database/queries/insert/users';
import getUser from '../database/queries/retrieve/users';
import { userDraw, userLose, userWin } from '../database/queries/update/users';
const battleController = async (req: Request, res: Response) => {
    const { fightersRepos, usernames } = res.locals;
    const { firstUser, secondUser } = usernames;
    const { firstUserRepos, secondUserRepos } = fightersRepos;
    try {
        const users = await getUsers(firstUser, secondUser);
        if (users.getFirstUser.rowCount === 0) {
            await setUser(firstUser);
        }else if(users.getSecondUser.rowCount === 0){
            await setUser(secondUser);           
        }else if((users.getSecondUser.rowCount === 0) && (users.getFirstUser.rowCount === 0)){
            await setUser(firstUser);           
            await setUser(secondUser);                       
        }
        starsBattle(firstUserRepos, secondUserRepos, firstUser, secondUser);
        res.sendStatus(200);
    } catch (e: any) {
        console.log(e.message);
        res.sendStatus(500);
    }
}

const getUsers = async (firstUser: string, secondUser: string) => {
    const getFirstUser = await getUser(firstUser);
    const getSecondUser = await getUser(secondUser);
    return { getFirstUser, getSecondUser };
}

const starsBattle = async (firstUserRepos: any, secondUserRepos: any, firstUser: string, secondUser: string) => {
    const { getFirstUser, getSecondUser } = await getUsers(firstUser, secondUser);
    let firstUserStars = 0, secondUserStars = 0;
    for (let i in firstUserRepos.data) {
        firstUserStars += parseInt(firstUserRepos.data[i].stargazers_count);
    }
    for (let i in secondUserRepos.data) {
        secondUserStars += parseInt(secondUserRepos.data[i].stargazers_count);
    }
    if (firstUserStars > secondUserStars) {
        await userWin(parseInt(getFirstUser.rows[0].id), (parseInt(getFirstUser.rows[0].wins)+1));
        await userLose(parseInt(getSecondUser.rows[0].id), (parseInt(getSecondUser.rows[0].losses)+1));
    } else if (secondUserStars > firstUserStars) {
        await userWin(parseInt(getSecondUser.rows[0].id), (parseInt(getSecondUser.rows[0].wins)+1));
        await userLose(parseInt(getFirstUser.rows[0].id), (parseInt(getFirstUser.rows[0].losses)+1));
    } else {
        await userDraw(parseInt(getFirstUser.rows[0].id), (parseInt(getFirstUser.rows[0].draws)+1));
        await userDraw(parseInt(getSecondUser.rows[0].id), (parseInt(getSecondUser.rows[0].draws)+1));
    }
}

export default battleController;