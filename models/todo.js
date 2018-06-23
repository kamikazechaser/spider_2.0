/**
 * Spider Task 2
 * Mohamed Sohail
 */

exports = module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("Todo", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        todo: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        tick: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        userid: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    });

    return Todo;
};