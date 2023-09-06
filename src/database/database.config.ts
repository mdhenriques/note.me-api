import { Sequelize } from "sequelize-typescript";
import pg from 'pg';
import { User } from "src/user/user.entity";
import { Posts } from "src/post/post.entity";

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: 5432, // A porta padrão do PostgreSQL
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'desafio3',
        dialectModule: pg, //Necessário para o deploy na vercel
        dialectOptions: { //Necessário para usar o servidor Postgre no Azure
          ssl: {      require: true, 
          }
      }
      });

      sequelize.addModels([ User, Posts ])
      await sequelize.sync();
      try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso 🚀');
      } catch (erro) {
        console.error('Conexão com o banco de dados falhou', erro);
      }
    }
  }
]
