import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function SkillName() {
  const Router = useRouter();
  const {
    query: { name },
  } = Router;

  const [listPokemon, setPokemonList] = useState([]);
  const [listName, setListName] = useState([]);
  useEffect(() => {
    const getPokemon = async () => {
      const resp = await fetch(`https://pokeapi.co/api/v2/ability/${name}/`);
      const data = await resp.json();
      setPokemonList(data.pokemon);
      //   console.log(data.pokemon);
      data.pokemon.forEach(async (el, i) => {
        const id = el.pokemon.url.split('/')[6];
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await resp.json();
        const img = data.sprites.other['official-artwork'].front_default;
        // listPokemon[i].imageUrl = img;
      });
    };
    if (name) {
      console.log(listPokemon, 'a');
      getPokemon();
    }
  }, [name]);

  useEffect(() => {
    // console.log(listPokemon);
  }, [listPokemon]);

  return (
    <div>
      <h1>List Pokemon</h1>
      {listPokemon.map(e => {
        return (
          <Link passHref href={`/pokemons/${e.pokemon.name}`}>
            <div key={e.pokemon.url}>
              <h3>{e.pokemon.name}</h3>
              {/* <img src={e.imageUrl} /> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
