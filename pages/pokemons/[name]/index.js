import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function IDPokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [img, setImg] = useState('');
  const Router = useRouter();
  const {
    query: { name },
  } = Router;

  useEffect(() => {
    const getPokemon = async name => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      console.log(data);
      setPokemon(data);
      setImg(data.sprites.other['official-artwork'].front_default);
    };
    if (name) {
      getPokemon(name);
    }
  }, [name]);

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={img} />
    </div>
  );
}
