import React from 'react';
import { usePokemonContext } from '../../src/Provider/Pokemon';

export default function CatchedPokemons() {
  const { state } = usePokemonContext();
  console.log(state);
  return (
    <div>
      {state.catchedPokemons.map(pokemon => {
        return <h1>{pokemon}</h1>;
      })}
    </div>
  );
}
