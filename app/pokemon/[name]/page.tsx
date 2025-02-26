import { PokemonDetails } from '@/app/components/PokemonDetails';
import type { Pokemon } from '@/lib/types';

async function getPokemon(name: string): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!response.ok) throw new Error('Failed to fetch pokemon');
  return response.json();
}
export async function generateStaticParams() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    if (!response.ok) throw new Error('Failed to fetch Pokémon list');
    const data = await response.json();
    const params = data.results.map((pokemon: { name: string }) => ({
      name: pokemon.name, // ✅ Ensure this is correct
    }));
    return params;
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}


export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon = await getPokemon(params.name);
  return <PokemonDetails pokemon={pokemon} />;
}