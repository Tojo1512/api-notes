const express = require("express");
const cors = require("cors");
const studentRoutes = require("./routes/students");

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/students", studentRoutes);

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    data: null,
    error: {
      message: "Erreur interne du serveur",
      details: err.message,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});
