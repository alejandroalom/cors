//Requerimos lo necesarios
const express = require('express');
const axios = require('axios');
const cors = require('cors');

//Inicializamos
const app = express();

//Usar CORS pa permitir peticiones del front
app.use(cors());

//Ruta pa obtener los personajes
app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data.results); //Solo mandamos los personajes
  } catch (error) {
    console.error('Error al obtener los personajes:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

//Ruta pa obtener un personaje x nombre
app.get('/characters/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    const personajes = response.data.results;

    //Si encontramos resultados devolvemos primero
    if (personajes && personajes.length > 0) {
      res.json(personajes[0]);
    } else {
      res.status(404).json({ error: 'Personaje no encontrado' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Personaje no encontrado' }); //Aunque sea error, puede ser porque no existe
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
