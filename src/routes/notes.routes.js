const express = require("express");
const router = express.Router();

// Controller
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/notes.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// Agregar nueva tarea
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

// Ver todas las tareas
router.get("/notes", isAuthenticated, renderNotes);

// Editar Tareas
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Delete Tareas
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
