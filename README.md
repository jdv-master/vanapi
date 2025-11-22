Código-fonte das aulas como criar API com [Node.js - TypeScript](https://www.youtube.com/watch?v=sDvr_KVJzwE&list=PLmY5AEiqDWwAY8AyeNy1zv-n4LEdGz1iE).<br>

## Requisitos

* Node.js 22 ou superior - Conferir a versão: node -v
* MySQL 8 ou superior - Conferir a versão: mysql --version
* GIT - Conferir a instalação: git -v

## Como rodar o projeto baixado

Alterar as credenciais do banco de dados no arquivo "src/data-source.ts".

Criar a base de dados "celke".
```
CREATE DATABASE celke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Instalar todas as dependencias indicada pelo package.json.
```
npm install
```

Compilar o arquivo TypeScript.
```
npx tsc
```

Executar as migrations para criar as tabelas no banco de dados.
```
npx typeorm migration:run -d dist/data-source.js
```

Executar o arquivo gerado com Node.js.
```
node dist/index.js
```

Importar a collection do diretório "postman" para o Postman no VS Code.<br>
A API é executada no endereço "http://localhost:8080".<br>

## Sequência para criar o projeto.

Criar o arquivo package.
```
npm init
```

Instalar o Express para gerenciar as requisições, rotas, URLs e entre outra funcionalidades.
```
npm i express
```

Instalar os pacotes para suporte ao TypeScript.
```
npm i --save-dev @types/express
npm i --save-dev @types/node
```

Instalar o compilador projeto com TypeScript e reiniciar o projeto quando o arquivo é modificado.
```
npm i --save-dev ts-node
```

Gerar o arquivo de configuração para o TypeScript.
```
npx tsc --init
```

Compilar o arquivo TypeScript.
```
npx tsc
```

Executar o arquivo gerado com Node.js.
```
node dist/index.js
```

Instalar a dependência para conectar o Node.js (TypeScript) com banco de dados.
```
npm install typeorm --save
```

Biblioteca utilizada no TypeScript para adicionar metadados (informações adicionais) a classes.
```
npm install reflect-metadata --save
```

Instalar o drive do banco de dados MySQL.
```
npm install mysql2 --save
```

Comando SQL para criar a base de dados.
```
CREATE DATABASE celke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Criar a migrations que será usada para criar a tabela no banco de dados.
```
npx typeorm migration:create src/migration/<nome-da-migration>
```
```
npx typeorm migration:create src/migration/CreateUsersTable
```

Executar as migrations para criar as tabelas no banco de dados.
```
npx typeorm migration:run -d dist/data-source.js
```

Permitir requisição externa.
```
npm install cors
npm install --save-dev @types/cors
```

## Como enviar o projeto para o GitHub.

Inicializar um novo repositorio GIT.
```
git init
```

Adicionar todos os arquivos modificados na área de preparação.
```
git add .
```

Commit registra as alterações feitas nos arquivos que foram adicionados na área de preparação.
```
git commit -m "Base do projeto"
```

Verificar em qual branch está.
```
git branch
```

Renomear a branch atual no GIT para main.
```
git branch -M main
```

Adicionar um repositório remoto ao repositório local.
```
git remote add origin https://github.com/celkecursos/tutorial-aula-curso-node22-typescript.git
```

Enviar os commits locais para um repositório remoto.
```
git push -u origin main
```
