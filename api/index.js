/**
 * Spider Task 2
 * Mohamed Sohail
 */

const express = require("express");

const router = express.Router();
const api = require("./endpoints");

router.post("/newnote", api.addNoteController);
router.post("/newtodo", api.addTodoController);
router.post("/updatenote", api.updateNoteController);
router.get("/updatetodo", api.updateTodoController);
router.get("/deletetodo/:id", api.deleteTodoController);
router.get("/deletenote/:id", api.deleteNoteController);

exports = module.exports = router;