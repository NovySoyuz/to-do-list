const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Exemple de route API
app.get('/api/message', (req, res) => {
  res.json({ message: 'Bonjour depuis le backend Express!' });
});

// Gérer les routes non définies
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});