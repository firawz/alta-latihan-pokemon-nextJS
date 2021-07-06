import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getSkills = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/ability/');
      const data = await response.json();
      const { results } = data;
      setSkills(results);
      console.log(results);
    };
    getSkills();
  }, []);
  return (
    <div>
      <h1>Skills</h1>
      {skills.map(skill => {
        return (
          <Link key={skill.url} passHref href={`skills/${skill.name}`}>
            <h3>{skill.name}</h3>
          </Link>
        );
      })}
    </div>
  );
}
