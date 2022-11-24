import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Pokemon = {
  species: {
    name: string;
    url: string;
  };
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = pokemonApi;
