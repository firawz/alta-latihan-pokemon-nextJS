import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const getPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
      const data = await response.json();
      const { results } = data;
      setPokemons(results);
    };
    getPokemons();
  }, []);

  return (
    <div>
      <h1>List Pokemons</h1>
      {pokemons.map(pokemon => {
        return (
          <Link key={pokemon.url} passHref href={`pokemons/${pokemon.name}`}>
            <h3>{pokemon.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}
