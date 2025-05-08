document.getElementById('searchBtn').addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
  
    if (!name) {
      alert('Por favor, introduce un nombre');
      return;
    }
  
    fetch(`http://localhost:3000/characters/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Personaje no encontrado');
        }
        return response.json();
      })
      .then(character => {
        const html = `
          <div class="character-card">
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p><strong>Status:</strong> ${character.status}</p>
            <p><strong>Species:</strong> ${character.species}</p>
            <p><strong>Gender:</strong> ${character.gender}</p>
            <p><strong>Origin:</strong> ${character.origin.name}</p>
          </div>
        `;
        document.getElementById('characterResult').innerHTML = html;
      })
      .catch(err => {
        document.getElementById('characterResult').innerHTML = `Error: ${err.message}`;
      });
});
  