import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFetchData } from '../../src/CustomHooks/useFetchData';

export default function Skills() {
  // const [skills, setSkills] = useState([]);
  const {
    data: { results },
    loading,
  } = useFetchData('https://pokeapi.co/api/v2/ability/');
  const skills = results;

  if (loading) {
    return <h1>Lagi loading...</h1>;
  }

  return (
    <div>
      <h1>Skills</h1>
      {skills?.map(skill => {
        return (
          <Link key={skill.url} passHref href={`skills/${skill.name}`}>
            <h3>{skill.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}
