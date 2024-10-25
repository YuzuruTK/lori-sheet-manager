import * as React from 'react'
import { Box, ChakraProvider, ColorModeScript, Grid, GridItem } from '@chakra-ui/react'
import {PlayerCard, Skill} from '../components/card';
import theme from './theme';

export default function Home() {

  let listaPlayers = []
  const playerValues = new Map<string, any>([
    ["name", "Test Player"],
    ["level", 5],
    ["xp_max", 500],
    ["xpActual", 200],
    ["playerName", "PlayerOne"],
    ["playerClass", "Warrior"],
    ["cristalsCount", 10],
    ["hpRelative", 80],
    ["hpTotal", 120],
    ["abilities", [
      new Map<string, any>([["name", "Thunder"], ["description", "UM TROVÃO"], ["cost", 1]]),
      new Map<string, any>([["name", "Fireball"], ["description", "UMA BOLA DE FOGO"], ["cost", 2]]),
      new Map<string, any>([["name", "Ice Spike"], ["description", "UM ESPINHO DE GELO"], ["cost", 2]]),
      new Map<string, any>([["name", "Earthquake"], ["description", "UM TERREMOTO"], ["cost", 3]]),
      new Map<string, any>([["name", "Wind Slash"], ["description", "UM CORTE DE VENTO"], ["cost", 1]]),
      new Map<string, any>([["name", "Shadow Bind"], ["description", "UMA PRISÃO SOMBRIA"], ["cost", 4]])
    ]
    ]
  ]);

  listaPlayers.push(playerValues, playerValues)

  let cardsNumber = listaPlayers.length > 3 ? 3 : listaPlayers.length;

  return (
    <Box width={{ base: "90%"}} margin={"5%"}>
    <Grid gap={5} templateColumns={{ base: "1fr", md: 'repeat(2, 1fr)',lg: `repeat(${cardsNumber}, 1fr)` }}> 
    {listaPlayers.map((values: Map<string, any>) => (
              <GridItem>
               <PlayerCard playerValues={values} />
              </GridItem>
            ))}
    </Grid>  
    </Box>
  );
}
