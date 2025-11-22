// Importar a biblioteca Express
import express, { Request, Response } from "express";

// Importar a biblioteca para permitir conexão externa
import cors from 'cors';

// Criar a aplicação Express
const app = express();

// Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());

// Criar o middleware para permitir requisição externa
app.use(cors());

// Incluir as CONTROLLERS
import UsersController from "./controllers/UsersController";

// Criar as rotas
app.use('/', UsersController)

// Criar a rota GET principal
app.get("/", (req: Request, res: Response) => {
    res.send("Bem-vindo Celke!");
});

// Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
});