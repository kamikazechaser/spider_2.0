/**
 * Spider Task 2
 * Mohamed Sohail
 */

exports = module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("Note", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        content: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        tag: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        userid: {
            type: Sequelize.INTEGER,
            notEmpty: true
        }
    });

    return Note;
};