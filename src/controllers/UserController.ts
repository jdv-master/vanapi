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
router.get("/user", async (req: Request, res: Response) => {
    try {
        // Criar uma instância do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        // Recupera todos os usuários do banco de dados
        const user = await userRepository.find();

        // Retorna os usuários como resposta
        res.status(200).json(user);
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
router.get("/user/:id_usuario", async (req: Request, res: Response) => {
    try {

        // Obter o ID do usuário a partir dos parâmetros da requisição
        const { id_usuario } = req.params;

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id_usuario: parseInt(id_usuario!) });

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
router.post("/user", async (req: Request, res: Response) => {
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
router.put("/user/:id_usuario", async (req: Request, res: Response) => {
    try {

        // Obter o ID do usuário a partir dos parâmetros da requisição
        const { id_usuario } = req.params;

        // Receber os dados enviados no corpo da requisição
        const data = req.body;

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({id_usuario: parseInt(id_usuario!)});

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
                id_usuario: Not(parseInt(id_usuario!)), // Exclui o próprio registro da busca
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
router.delete("/user/:id_usuario", async (req: Request, res: Response) => {

    try{

        // Obter o ID do usuário a partir dos parâmetros da requisição
        const { id_usuario }= req.params;

        // Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        // Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy( {id_usuario: parseInt(id_usuario!)});

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