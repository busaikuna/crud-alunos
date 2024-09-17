import express from "express";
import cors from "cors";
import connection from "./connection.js";

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/", async (req, res) => {
    console.log(req.body);
    const { nome, matricula, cpf } = req.body;
    try {
        await connection.query(`
            INSERT INTO alunos (nome, matricula, cpf)
            VALUES ($1, $2, $3)
        `, [nome, matricula, cpf]);
        res.status(201).send("created");
    } catch (error) {
        console.error(error);
        res.status(500).send("error");
    }
});

app.get("/", async (req, res) => {
    try {
        const data = await connection.query("SELECT * FROM alunos;");
        res.send(data.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
