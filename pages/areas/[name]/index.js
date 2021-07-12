import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { usePokemonContext } from '../../../src/Provider/Pokemon';
import Image from 'next/image';

export default function AreaName() {
    const Router = useRouter();
    const {
        query: { name: area },
    } = Router;
    const [listPokemon, setListPokemon] = useState([]);
    const [img, setImg] = useState([]);
    const [id, setId] = useState([]);

    useEffect(() => {
        const getPokemons = async area => {
            const resp = await fetch(
                `https://pokeapi.co/api/v2/location-area/${area}/`
            );
            const data = await resp.json();
            const { pokemon_encounters } = data;
            setListPokemon(pokemon_encounters);
        };

        if (area) {
            getPokemons(area);
        }
    }, [area]);

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
                const resp = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${el}`
                );
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
    console.log(state);
    useEffect(() => {
        console.log(state);
    }, [state]);
    return (
        <div>
            <Link passHref href={`/catched-pokemons`}>
                <a>To Catched Pokemons</a>
            </Link>
            <h1>{area}</h1>
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
                                payload: { name: e.pokemon?.name, area },
                            });
                            alert(`${e.pokemon?.name} is catched!`);
                        }}
                    >
                        <h3>{e.pokemon?.name}</h3>
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
