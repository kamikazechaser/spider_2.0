/**
 * Spider Task 2
 * Mohamed Sohail
 */

const models = require("../models");
const Note= models.Note;
const Todo = models.Todo;

exports = module.exports = {
    addNoteController: (req, res) => {
        if (req.user === undefined) {
            return res.redirect("/signin");
        }

        const noteObject = {
            title: req.body.title,
            content: req.body.content,
            tag: req.body.tag,
            userid: req.user.id
        }

        return Note.create(noteObject).then((createdNote, created) => {
            if (!createdNote) return res.status(500).json({ error: "Couldn't create note" });
            if (createdNote) return res.redirect("back");
        });
    },

    updateNoteController: (req, res) => {
        if (req.user === undefined) {
            return res.redirect("/signin");
        }

        return Note.update({ content: req.body.content}, { where: { id: req.body.id }}).then(updatedNote => {
            if (!updatedNote) return res.status(500).json({ error: "Couldn't update note" });
            if (updatedNote) return res.redirect("/home");
        });
    },

    deleteNoteController: (req, res) => {
        if (req.user === undefined) {
            return res.redirect("/signin");
        }

        return Note.destroy({ where: { id: req.params.id }}).then(deletedNote => {
            if (!deletedNote) return res.status(500).json({ error: "Couldn't delete note" });
            if (deletedNote) return res.redirect("/home");
        });
    },

    addTodoController: (req, res) => {
        if (req.user === undefined) {
            return res.redirect("/signin");
        }

        const todoObject = {
            todo: req.body.todo,
            userid: req.user.id
        }

        return Todo.create(todoObject).then((createdTodo, created) => {
            if (!createdTodo) return res.status(500).json({ error: "Couldn't create note" });
            if (createdTodo) return res.redirect("back");
        });
    },

    updateTodoController: (req, res) => {
        if (req.user === undefined) {
            return res.redirect("/signin");
        }

        return Todo.update({ tick: req.query.tick }, { where: { id: (req.query.id).split("").pop() }}).then(updatedTodo => {
            if (!updatedTodo) return res.status(500).json({ error: "Couldn't update todo" });
            if (updatedTodo) return res.redirect("/home");
        });
    },

    deleteTodoController: (req, res) => {
        if (req.user === undefined) {
            return res.redirect("/signin");
        }

        return Todo.destroy({ where: { id: req.params.id }}).then(deletedTodo => {
            if (!deletedTodo) return res.status(500).json({ error: "Couldn't delete todo" });
            if (deletedTodo) return res.redirect("/home");
        });
    }
}