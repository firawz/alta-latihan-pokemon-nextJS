import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFetchData } from '../../../src/CustomHooks/useFetchData';

export default function SkillName() {
  const [pokemonImg, setPokemonImg] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const Router = useRouter();
  const {
    query: { name },
  } = Router;

  const {
    data: { pokemon: listPokemon },
  } = useFetchData(name ? `https://pokeapi.co/api/v2/ability/${name}/` : '');

  const getImage = async () => {
    const temp = listPokemon;
    for (let i = 0; i < listPokemon.length; i++) {
      const id = listPokemon[i].pokemon.url.split('/')[6];
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await resp.json();
      temp[i].pokemon.img =
        data.sprites.other['official-artwork'].front_default;
    }
    setPokemons(temp);
  };

  useEffect(() => {
    setPokemons(listPokemon);
    if (listPokemon) {
      getImage();
    }
  }, [listPokemon]);
  // console.log(listPokemon);
  // data.pokemon.forEach(async (el, i) => {
  //   const id = el.pokemon.;
  //   const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //   const data = await resp.json();
  //   const img = data.sprites.other['official-artwork'].front_default;
  //   // listPokemon[i].imageUrl = img;
  // });
  return (
    <div>
      <h1>List Pokemon</h1>
      {pokemons?.map(e => {
        return (
          <Link
            key={e.pokemon.url}
            passHref
            href={`/pokemons/${e.pokemon.name}`}
          >
            <div>
              <h3>{e.pokemon.name}</h3>
              <img src={e?.pokemon?.img} alt="pokemon" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
