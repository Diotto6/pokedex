import {
  Box,
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

  const status = useSelector((state: RootState) =>
    selectStatusByName(state, name)
  );

  const data = useSelector((state: RootState) => selectDataByName(state, name));
  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchPokemonByName(name));
    }
  }, [status, name, dispatch]);

  const isUninitialized = status === undefined;
  const isLoading = status === "pending" || status === undefined;
  const isError = status === "rejected";
  const isSuccess = status === "fulfilled";

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
  console.log(pokemon);

  return (
    <>
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="100vw"
        height="40vh"
      >
        <Box display="flex" alignItems="center" justifyContent="center">
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
          <Box>
            <Button
              className={
                pokemon !== undefined ? pokemon?.types[0].type.name : ""
              }
              variant="contained"
              sx={{
                backgroundColor:
                  pokemon !== undefined
                    ? pokemon?.types[0].type.name
                    : "#141414e8",
                "&:hover": {
                  backgroundColor:
                    pokemon !== undefined
                      ? pokemon?.types[0].type.name
                      : "rgba(29, 28, 28, 0.173)",
                  borderColor: "#f3f3f3",
                  boxShadow: "none",
                },
              }}
              onClick={() => handlePokemon()}
            >
              Buscar
            </Button>
          </Box>
        </Box>
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
            className={pokemon?.types[0].type.name}
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
