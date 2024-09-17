import pkg from 'pg';
const {Pool} = pkg;

const connection = new Pool(
    {
        user: "postgres",
        password: "busai",
        database: "alunos",
        host: "localhost",
        port: "5432"
    }
)

export default connection