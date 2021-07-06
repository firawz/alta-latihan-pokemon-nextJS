import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Areas() {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    const getArea = async () => {
      const resp = await fetch('https://pokeapi.co/api/v2/location-area');
      const data = await resp.json();
      const { results } = data;
      setAreas(results);
    };
    getArea();
  }, []);

  return (
    <div>
      <h1>Areas</h1>
      {areas.map(area => {
        return (
          <Link key={area.url} passHref href={`/areas/${area.name}`}>
            <h3>
              {area.name
                .replace(area.name[0], area.name[0].toUpperCase())
                .replaceAll('-', ' ')}
            </h3>
          </Link>
        );
      })}
    </div>
  );
}
