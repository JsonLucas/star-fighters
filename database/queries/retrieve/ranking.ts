import dbConnection from "../../dbConnection";

const getRanking = async () => {
    const sql = `SELECT * FROM fighters ORDER BY wins DESC, draws DESC, losses ASC`;
    const { rows } = await dbConnection().query(sql);
    return { rows };
}

export default getRanking;