import { DataTypes, Sequelize } from "sequelize";
import path from "path";
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "./db/mep_api.sqlite"),
    logging: console.log,
    dialectOptions: {
        timeout: 30000, // Set a busy timeout of 30 seconds
    },
});
const Alert = sequelize.define("Alert", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    awareness_response: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
sequelize
    .sync({ force: true })
    .then(() => {
    console.log("Database & tables created!");
})
    .catch((error) => {
    console.error("Error creating database & tables:", error);
});
module.exports = {
    sequelize,
    Alert,
};
//# sourceMappingURL=main..js.map