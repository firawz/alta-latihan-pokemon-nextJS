import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchData } from '../../../src/CustomHooks/useFetchData';
import { usePokemonContext } from '../../../src/Provider/Pokemon';

export default function IDPokemon() {
  const Router = useRouter();
  const {
    query: { name },
  } = Router;
  const { data, loading } = useFetchData(
    name ? `https://pokeapi.co/api/v2/pokemon/${name}` : ''
  );
  const pokemon = data?.name;
  const img = data.sprites?.other['official-artwork']?.front_default;

  if (loading) {
    return <h1>lagi loading</h1>;
  }

  const { state } = usePokemonContext();

  console.log(state);

  return (
    <div>
      <h1>{pokemon}</h1>
      <img src={img} />
    </div>
  );
}
