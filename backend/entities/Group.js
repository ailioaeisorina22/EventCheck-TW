import db from "../dbConfig.js"; 
import { Sequelize } from "sequelize";

const Group = db.define("Group", {
  GroupId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  GroupName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  GroupDetails: {
    type: Sequelize.STRING,
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Group;
