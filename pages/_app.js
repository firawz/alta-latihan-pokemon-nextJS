import { PokemonProvider } from '../src/Provider/Pokemon';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <Component {...pageProps} />
    </PokemonProvider>
  );
}

export default MyApp;
