import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialectModule: pg, //Necessário para o deploy na vercel
        dialectOptions: { //Necessário para usar o servidor Postgre no Azure
          ssl: {
            require: true,
          }
    }
});

