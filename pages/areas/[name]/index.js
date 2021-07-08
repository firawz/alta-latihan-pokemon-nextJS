import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePokemonContext } from '../../../src/Provider/Pokemon';
// import Img from 'next/image'
export default function AreaName() {
  const Router = useRouter();
  const {
    query: { name },
  } = Router;
  const [listPokemon, setListPokemon] = useState([]);
  const [img, setImg] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    const getPokemons = async name => {
      const resp = await fetch(
        `https://pokeapi.co/api/v2/location-area/${name}/`
      );
      const data = await resp.json();
      const { pokemon_encounters } = data;
      setListPokemon(pokemon_encounters);
    };

    if (name) {
      getPokemons(name);
    }
  }, [name]);

  useEffect(() => {
    if (listPokemon) {
      listPokemon.forEach(e => {
        setId(prev => [...prev, getId(e)]);
      });
    }
  }, [listPokemon]);

  useEffect(() => {
    const getImg = () => {
      id.forEach(async (el, i) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${el}`);
        const data = await resp.json();
        listPokemon[i] = {
          ...listPokemon[i],
          img: data.sprites.other['official-artwork'].front_default,
        };

        setImg(data.sprites.other['official-artwork'].front_default);
      });
    };
    if (id) {
      getImg();
    }
  }, [id, listPokemon]);

  const getId = id => {
    return id.pokemon.url.split('/')[6];
  };

  const { state, dispatch } = usePokemonContext();

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div>
      <h1>{name}</h1>
      <h2> you will encounter this pokemon in this area </h2>
      {listPokemon.map((e, i) => {
        return (
          <div
            key={e.pokemon?.url}
            onClick={() => {
              // console.log(e.pokemon.name);
              // console.log(state.catchedPokemons);
              dispatch({
                type: 'CATCH_POKEMON',
                payload: e.pokemon?.name,
              });
            }}
          >
            <h3>{e.pokemon?.name}</h3>
            <img src={e.img} />
          </div>
        );
      })}
    </div>
  );
}

// <Link
//   key={e.pokemon?.url}
//   passHref
//   href={`/pokemons/${e.pokemon.name}`}
// >
//   </Link>
