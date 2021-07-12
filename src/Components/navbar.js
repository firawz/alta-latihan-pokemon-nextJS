import Link from 'next/link';

export const Navbar = () => {
  return (
    <div>
      <Link passHref href="/areas">
        <a>Areas</a>
      </Link>
      <Link passHref href="/skills">
        <a>Skills</a>
      </Link>
      <Link passHref href="/catched-pokemons">
        <a>Catched Pokemons</a>
      </Link>
    </div>
  );
};
