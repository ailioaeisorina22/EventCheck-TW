import Sequelize from "sequelize";
import env from 'dotenv';

env.config();

const db = new Sequelize({
    dialect : 'mysql',
    database : 'EventCheckDB', //numele bazei de date
    username : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    logging : false,
    //host daca avem mai multe date
    define : {
        timestamps : false,
        freezeTableName : true, //daca schimbam baza de date 
    }
}
)

export default db;