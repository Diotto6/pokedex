import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Pokemon, useGetPokemonByNameQuery } from "../services/pokemon";

export function GetPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [skip, setSkip] = useState<boolean>(true);

  const [search, setSearch] = useState<string>("");

  const { data, error, isLoading } = useGetPokemonByNameQuery(search, { skip });

  function handlePokemon() {
    if (search.length > 3) {
      setSkip(false);
    }
    setTimeout(() => setSkip(true), 1000);
  }

  useEffect(() => {
    console.log(error);

    console.log(data);
    if (error) {
      setPokemon(undefined);
    }
    if (data) {
      setPokemon(data);
    }
  }, [data, error]);

  return (
    <>
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100vw"
        height="40vh"
      >
        <TextField
          label="Pokemon"
          placeholder="Digite um pokemon"
          id="pokemon"
          name="pokemon"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          sx={{ pr: 1 }}
        />
        <Button variant="contained" onClick={() => handlePokemon()}>
          Buscar
        </Button>
      </Grid>

      {error ? (
        <>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100vw"
          >
            <Typography variant="h6">Nenhum pokemon encontrado</Typography>
          </Grid>
        </>
      ) : isLoading ? (
        <>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100vw"
          >
            <CircularProgress />
            <Typography variant="h6"> Loading...</Typography>
          </Grid>
        </>
      ) : pokemon ? (
        <>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100vw"
          >
            <Typography variant="h6">{pokemon.species.name}</Typography>

            <img src={pokemon.sprites.other.dream_world.front_default} />
          </Grid>
        </>
      ) : (
        <>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100vw"
          >
            <Typography variant="h6">
              Pesquise um pokemon para aparecer aqui!
            </Typography>
          </Grid>
        </>
      )}
    </>
  );
}

export default GetPokemon;
