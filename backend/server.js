const { randomUUID } = require('crypto');
const express = require('express');
const path = require('path');
const axios = require('axios');

const FIREBASE_URL = 'https://react-37010-default-rtdb.europe-west1.firebasedatabase.app/';

const app = express();
const PORT = process.env.PORT || 3000;

const todos = [];

app.use(express.json());

// Middleware pour servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/todos', async (req, res) => {
    try {
        const response = await axios.get(`${FIREBASE_URL}.json`);
        const todos = response.data || {};
        const list = Object.entries(todos).map(([id, val]) => ({ id, ...val }));
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Erreur Firebase' });
    }
});

app.post('/api/post', async (req, res) => {
  // recuperation du texte depuis la requete
  try {
  const { texte } = req.body;
  // creation de la tache
  const tache = {
      //id : Date.now(),
      texte : texte,
      done: false
  };
  const response = await axios.post(`${FIREBASE_URL}.json`, tache);
  res.status(201).json({ id: response.data.name, ...tache });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur Firebase' });
  }
  
  // ajout en memoire dans le tableau
  //todos.push(tache);
  // reponse et retourner la tache
  //res.status(201).json(tache);
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    // Récuperation de l'id dans le parametre
  const { id } = req.params;

  // Trouver l'index de la tâche
  //const index = todos.findIndex(t => t.id === id);

   // Supprimer la tâche
  //const deleted = todos.splice(index, 1);
  //res.status(200).json(deleted[0]);

  const response = await axios.delete(`${FIREBASE_URL}/${id}.json`);
  
  res.status(200).json({ message: "success suppress" });

  } catch (error){
    console.error(error);
    res.status(500).json({ error: 'Erreur Firebase' });
  }
  
});

// Gérer les routes non définies
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
