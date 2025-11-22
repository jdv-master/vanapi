import "reflect-metadata";

import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "van",
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
})

AppDataSource.initialize()
    .then( () => {
        console.log("Conexão Ok!");
    }).catch((error) => {
        console.log("Erro na Conexão", error);
    })