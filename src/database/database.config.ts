import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'desafio3.postgres.database.azure.com',
    port: 5432,
    username: 'mdhenriques',
    password: 'm*XUdjdxrcve1',
    database: 'desafio3',
    dialectModule: pg, //Necessário para o deploy na vercel
        dialectOptions: { //Necessário para usar o servidor Postgre no Azure
          ssl: {
            require: true,
          }
    }
});

