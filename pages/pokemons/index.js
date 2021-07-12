import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFetchData } from '../../src/CustomHooks/useFetchData';

export default function Pokemons() {
  const {
    data: { results },
    loading,
  } = useFetchData('https://pokeapi.co/api/v2/pokemon/');
  const pokemons = results;

  if (loading) {
    return <h1>Lagi loading Boss</h1>;
  }

  return (
    <div>
      <h1>List Pokemons</h1>
      {pokemons?.map(pokemon => {
        return (
          <Link key={pokemon.url} passHref href={`pokemons/${pokemon.name}`}>
            <h3>{pokemon.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}
