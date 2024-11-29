const express = require("express");
const router = express.Router();
const StudentController = require("../../../controllers/studentController");

router.get("/notes/:idEtudiant/:semestre", StudentController.getGrades);

module.exports = router;
