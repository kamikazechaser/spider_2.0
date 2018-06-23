/**
 * Spider Task 2
 * Mohamed Sohail
 */

exports = module.exports = {
    prefetchNotes,
    prefetchTodos,
    fetchNote
}

const models = require("../models");

function prefetchNotes(user, callback) {
    return models.Note.findAll({ raw: true, where: { userid: user } }).then(notes => {
        return callback(notes);
    });
}

function prefetchTodos(user, callback) {
    return models.Todo.findAll({ raw: true, where: { userid: user } }).then(todos => {
        return callback(todos);
    });
}

function fetchNote(user, id, callback) {
    return models.Note.findAll({ raw: true, where: { userid: user, id: id } }).then(note => {
        return callback(note);
    });
}