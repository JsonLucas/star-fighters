import dbConnection from "../../dbConnection";

const getUser = async (username: string) => {
    const sql = `SELECT * FROM fighters WHERE "username"=$1`;
    const { rowCount, rows } = await dbConnection().query(sql, [username]);
    return { rowCount, rows };
}

export default getUser;