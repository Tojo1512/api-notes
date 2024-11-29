const StudentService = require("../services/studentService");
const BaseResponse = require("../models/BaseResponse");

const StudentController = {
  async getGrades(req, res) {
    try {
      const { idEtudiant, semestre } = req.params;
      const grades = await StudentService.getGradesBySemester(
        idEtudiant,
        semestre
      );

      if (!grades) {
        return res
          .status(404)
          .json(BaseResponse.error("Notes non trouvées", 404));
      }

      return res.status(200).json(BaseResponse.success(grades));
    } catch (error) {
      return res
        .status(500)
        .json(BaseResponse.error("Erreur serveur", 500, error.message));
    }
  },
};

module.exports = StudentController;
