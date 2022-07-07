import dbConnection from "../../dbConnection";

const setUser = async (username: string) => {
    const sql = `INSERT INTO fighters ("username", "wins", "losses", "draws") VALUES ($1, 0, 0, 0)`;
    const { rowCount } = await dbConnection().query(sql, [username]);
    return { rowCount };
}

export default setUser;