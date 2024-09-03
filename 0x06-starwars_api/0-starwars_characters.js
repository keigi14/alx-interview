#!/usr/bin/node

const request = require('request');

// Get the movie ID from the command-line arguments
const movieId = process.argv[2];

// Construct the URL for the movie endpoint
const movieEndpoint = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

// Function to request and print character names
function fetchCharacterNames(characterList, index) {
  if (index >= characterList.length) {
    return;
  }

  request(characterList[index], (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }

    try {
      const character = JSON.parse(body);
      console.log(character.name);
    } catch (err) {
      console.error('Failed to parse character data:', err);
    }

    // Fetch the next character
    fetchCharacterNames(characterList, index + 1);
  });
}

// Request the movie details to get the list of characters
request(movieEndpoint, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  try {
    const movie = JSON.parse(body);
    const characterList = movie.characters;
    
    // Start fetching character names
    fetchCharacterNames(characterList, 0);
  } catch (err) {
    console.error('Failed to parse movie data:', err);
  }
});
