import React from 'react';
import { usePokemonContext } from '../../src/Provider/Pokemon';

export default function CatchedPokemons() {
    const { state } = usePokemonContext();
    console.log(state);
    return (
        <div>
            {state.catchedPokemons.map(pokemon => {
                return (
                    <h1 key={pokemon.name}>
                        {pokemon.name}, catched from {pokemon.area}
                    </h1>
                );
            })}
        </div>
    );
}
