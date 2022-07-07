import dbConnection from "../../dbConnection";

export const userWin = async (id: number, wins: number) => {
    const sql = `UPDATE fighters SET "wins"=$1 WHERE "id"=$2`;
    const { rowCount } = await dbConnection().query(sql, [wins, id]);
    return { rowCount };
}

export const userLose = async (id: number, losses: number) => {
    const sql = `UPDATE fighters SET "losses"=$1 WHERE "id"=$2`;
    const { rowCount } = await dbConnection().query(sql, [losses, id]);
    return { rowCount };
}

export const userDraw = async (id: number, draws: number) => {
    const sql = `UPDATE fighters SET "draws"=$1 WHERE "id"=$2`;
    const { rowCount } = await dbConnection().query(sql, [draws, id]);
    return { rowCount };
}