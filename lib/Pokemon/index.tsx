import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { Pokemon } from "../services/pokemon";

import { useSelector } from "react-redux";
import { store } from "../store";
import type { RootState } from "../store";
import {
  fetchPokemonByName,
  selectStatusByName,
  selectDataByName,
} from "../services/pokemon";

export function useGetPokemonByNameQuery(name: string) {
  const dispatch = store.dispatch;
  // select the current status from the store state for the provided name
  const status = useSelector((state: RootState) =>
    selectStatusByName(state, name)
  );
  // select the current data from the store state for the provided name
  const data = useSelector((state: RootState) => selectDataByName(state, name));
  useEffect(() => {
    // upon mount or name change, if status is uninitialized, send a request
    // for the pokemon name
    if (status === undefined) {
      dispatch(fetchPokemonByName(name));
    }
  }, [status, name, dispatch]);

  // derive status booleans for ease of use
  const isUninitialized = status === undefined;
  const isLoading = status === "pending" || status === undefined;
  const isError = status === "rejected";
  const isSuccess = status === "fulfilled";

  // return the import data for the caller of the hook to use
  return { data, isUninitialized, isLoading, isError, isSuccess };
}

function GetPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const [search, setSearch] = useState<string>("");

  const { data, isError, isLoading } = useGetPokemonByNameQuery(search);

  function handlePokemon() {
    if (search.length > 3) {
      if (data) {
        setPokemon(data);
      }
    }
    if (isError) {
      setPokemon(undefined);
    }
  }

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

      {isError ? (
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
            <Typography variant="h6">{pokemon.species?.name}</Typography>

            <img src={pokemon.sprites?.other.dream_world.front_default} />
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
