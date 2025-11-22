// Importar a biblioteca Express
import express, { Request, Response } from "express";
// Importar a conexão com banco de dados
import { AppDataSource } from "../data-source";
// Importar a entidade
import { User } from "../entity/User";
// Importar o Not para utilizar como restrição para ignorar o próprio id na consulta
import { Not } from "typeorm";
// Criar a aplicação Express
const router = express.Router();

// Criar a rota para listar os usuários
// Endereço para acessar a API através da aplicação externa com o verbo GET: http://localhost:8080/users
router.get("/users", async (req: Request, res: Response) => {
    try {
        // Criar uma instância do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        // Recupera todos os usuários do banco de dados
        const users = await userRepository.find();

        // Retorna os usuários como resposta
        res.status(200).json(users);
        return;

    } catch (error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao listar os usuários!"
        });
        return;
    }
});

// Rota para visualizar um usuário específico
// Endereço para acessar a api através da aplicação externa com o verbo GET: http://localhost:8080/users/:id
router.get("/users/:id", async (req: Request, res: Response) => {
    try {

        // Obter o ID do usuário a partir dos parâmetros da requisição
        const { id } = req.params;

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: parseInt(id) });

        // Verificar se o usuário foi encontrado
        if (!user) {
            res.status(404).json({
                message: "Usuário não encontrada!"
            });
            return;
        }

        // Retornar o usuário encontrado
        res.status(200).json({ user });
        return;

    } catch (error) {
        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao visualizar o usuário!"
        });
        return;
    }
});

// Criar a rota para cadastrar usuário
// Endereço para acessar a api através da aplicação externa com o verbo POST: http://localhost:8080/users
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "name": "Cesar",
    "email": "cesar@celke.com.br"
}
*/
router.post("/users", async (req: Request, res: Response) => {
    try {
        // Receber os dados enviados no corpo da requisição
        var data = req.body;

        // Criar uma instância do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        // Recuperar o registro do banco de dados com o valor da coluna email
        const existingUser = await userRepository.findOne({ where: { email: data.email } });

        // Verificar se já existe usuário cadastrado com esse e-mail
        if (existingUser) {
            res.status(400).json({
                message: "Já existe usuário cadastrado com esse e-mail!",
            });
            return;
        }

        // Criar um novo registro
        const newUser = userRepository.create(data);

        // Salvar o registro no banco de dados
        await userRepository.save(newUser);

        // Retornar resposta de sucesso
        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: newUser,
        });
    } catch (error) {

        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao cadastrar usuário!"
        });
    }
});

// Criar a rota para editar usuário
// Endereço para acessar a api através da aplicação externa com o verbo PUT: http://localhost:8080/users/:id
// A aplicação externa deve indicar que está enviado os dados em formato de objeto: Content-Type: application/json
// Dados em formato de objeto
/*
{
    "name": "Cesar",
    "email": "cesar@celke.com.br"
}
*/
router.put("/users/:id", async (req: Request, res: Response) => {
    try {

        // Obter o ID do usuário a partir dos parâmetros da requisição
        const { id } = req.params;

        // Receber os dados enviados no corpo da requisição
        const data = req.body;

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({id: parseInt(id)});

        // Verificar se o usuário foi encontrado
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!",
            });
            return;
        }

        // Verificar se já existe outro usuário com o mesmo e-mail, mas que não seja o registro atual
        const existingUser = await userRepository.findOne({
            where: {
                email: data.email,
                id: Not(parseInt(id)), // Exclui o próprio registro da busca
            }
        });

        // Verificar se o usuário foi encontrado
        if(existingUser) {
            res.status(400).json({
                message: "Já existe um usuário cadastrado com esse email!",
            });
            return;
        }

        // Atualizar os dados do usuário
        userRepository.merge(user, data);

        // Salvar as alterações no banco de dados
        const updateUser = await userRepository.save(user);

        // Retornar resposta de sucesso
        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: updateUser,
        });        

    } catch (error) {

        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao editar usuário!"
        });
    }
});

// Criar a rota para apagar um usuário
// Endereço para acessar a API através da aplicação externa com o verbo DELETE: http://localhost:8080/users/:id
router.delete("/users/:id", async (req: Request, res: Response) => {

    try{

        // Obter o ID do usuário a partir dos parâmetros da requisição
        const { id }= req.params;

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy( {id: parseInt(id)});

        // Verificar se o usuário foi encontrado
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!"
            });
            return;
        }

        // Remover o usuário do banco de dados
        await userRepository.remove(user);

        // Retornar resposta de sucesso
        res.status(200).json({
            message: "Usuário apagado com sucesso!",
        });   

    } catch (error) {

        // Retornar erro em caso de falha
        res.status(500).json({
            message: "Erro ao apagar usuário!"
        });
    }

});

// Exportar a instrução que está dentro da constante router 
export default router;