import React, { useState, useEffect } from 'react';

function TodoApp() {
  // todos et texte sont des variables d'etats (vide à l'initialisation)
  // set permet de modifier l'etat
  // userState sert à stocker des infos dans le composant
  const [todos, setTodos] = useState([]);
  const [texte, setTexte] = useState('');

  // 1) Charger les tâches existantes au montage
  // useEffect = Executer du code aprés que le composé est affiché
  useEffect(() => {
    // Lance la requete
    fetch('/api/todos')
      // Une o=fois quelle est recup on transforme en json 
      .then(res => res.json())
      // On recup les données pour stocker dans todos
      .then(data => setTodos(data))
      // recup les erreurs
      .catch(console.error);
  }, []);

  // 2) Ajouter une nouvelle tâche
  // Fonction asynchrone, se declenche uniquement quand on veut ajouter une tache
  const ajouterTache = async (e) => {
    // Empeche le rechargement de la page quand on envoie le formulaire
    e.preventDefault();
    // Si rien tapé on ne fait rien
    if (!texte.trim()) return;
    try {
      // Envoie d'une requete POST avec le contenu de la tache
      const res = await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte }),
      });
      if (!res.ok) throw new Error(res.statusText);
      // Une fois la reponse reçu on transforme en JSON
      const nouvelleTache = await res.json();

      // 3) Mettre à jour l'état pour déclencher le re-render
      // Modification de l'etat
      // prev = ancien etat
      // ...prev copie tout ce qu'il y avait avant
      // nouvelleTache est ajoutée à la fin de cette liste
      setTodos(prev => [...prev, nouvelleTache]);
      // Vide le champs du texte
      setTexte('');
    } catch (err) {
      console.error(err);
    }
  };

  // Fonction async qui prend en parametre id
  const supprimerTache = async (id) => {
  try {
    // Envoie d'une requete DELETE
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Échec de la suppression');
    
    // Idem précedent
    // Mettre à jours la liste des taches en retirant celle dont l'id est supprimé
    // filter = retourne la liste sans la tache, on parcout chaque todo du tableau 
    // On garde uniquement ceux dont l'id est different de celui qu'on veut supprimer
    // prev = tableau des taches avant suppression
    setTodos(prev => prev.filter(todo => todo.id !== id));
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div>
      <h1>Ma Todo-List</h1>
      <form onSubmit={ajouterTache}>
        <input
          type="text"
          value={texte}
          // A chaque frappe mettre à jours l'etat 
          onChange={e => setTexte(e.target.value)}
          placeholder="Nouvelle tâche"
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
      
        {todos.map(todo => ( // Parcours toutes les taches stockées dans l'etat todos
        // Identification de chaque element
          <li key={todo.id}>
            {todo.texte} {todo.done ? '✅' : ''}
            <button onClick={() => supprimerTache(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;