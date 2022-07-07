import pg from 'pg';
import { connection } from '../utils/envConfig';

const { Pool } = pg;
const dbConnection = () => {
    return new Pool({
        connectionString: connection
    });
}

export default dbConnection;