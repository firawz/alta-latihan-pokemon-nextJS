import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFetchData } from '../../../src/CustomHooks/useFetchData';
import Image from 'next/image';

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

    return (
        <div>
            <h1>{pokemon}</h1>
            <Image
                src={img}
                layout="fill"
                objectFit="contain"
                alt="pokemon image"
            />
        </div>
    );
}
