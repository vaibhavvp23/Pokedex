import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  name: string;
  types: string;
  number: number;
  image: string;
  weaknesses: ["string"];
  resistant: ["string"];
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      types
      number
      image
    }
  }
`;

export const GET_POKEMON = gql`
  query pokemon($id: String!) {
    pokemon(id: $id) {
      id
      name
      types
      number
      image
      weaknesses
      resistant
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });
  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};

export const useGetPokemonDetails = (id: any) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id: id,
      first: 1,
    },
  });
  const pokemonDetails: Pokemon = useMemo(() => data?.pokemon || [], [data]);

  return {
    pokemonDetails,
    ...queryRes,
  };
};
