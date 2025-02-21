import db from '../dbConfig.js'; 
import  { Sequelize } from "sequelize";

const AttendanceList = db.define('AttendanceList', {
    UserId : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
    },
    EventId : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull : false,
    },
    AttendanceListCreateDate : {
        type : Sequelize.DATE,
        allowNull : false,
    }
})

export default AttendanceList;