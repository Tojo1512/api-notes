const pool = require("../config/db");
const BaseResponse = require("../models/baseResponse");

const StudentService = {
  async getGradesBySemester(idEtudiant, semestre) {
    try {
      const query = `
                SELECT 
                    e.nom, 
                    e.prenom, 
                    u.intitule as matiere,
                    ex.note,
                    s.semestre,
                    r.intitule as resultat
                FROM etudiant e
                JOIN etudiant_examen ee ON e.id_etudiant = ee.id_etudiant
                JOIN examen ex ON ee.id_examen = ex.id_examen
                JOIN ue_examen ue_ex ON ex.id_examen = ue_ex.id_examen
                JOIN ue u ON ue_ex.id_ue = u.id_ue
                JOIN session s ON u.id_session = s.id_session
                JOIN resultat r ON ex.id_resultat = r.id_resultat
                WHERE e.id_etudiant = $1 
                AND s.semestre = $2
            `;

      const result = await pool.query(query, [idEtudiant, semestre]);

      if (result.rows.length === 0) {
        return null;
      }

      return {
        etudiant: {
          nom: result.rows[0].nom,
          prenom: result.rows[0].prenom,
        },
        semestre: result.rows[0].semestre,
        notes: result.rows.map((row) => ({
          matiere: row.matiere,
          note: parseFloat(row.note),
          resultat: row.resultat,
        })),
      };
    } catch (error) {
      console.error("Erreur dans getGradesBySemester:", error);
      throw error;
    }
  },
};

module.exports = StudentService;
