import React, { useEffect, useState } from "react";
import { Box, ChakraProvider, ColorModeScript, Grid, GridItem } from '@chakra-ui/react'
import {PlayerCard, Skill} from '../components/card';
import theme from './theme';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://0.0.0.0:8090');


interface Record {
  id: string;
  someFieldName: string;  // Replace with your actual field names
}

export default function Home() {


  const [dataList, setDataList] = useState<Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

// new Map<string, any>([["name", "Bola de Fogo?"], ["description", "Atacar um aliado do grupo com uma bola de fogo, deferindo 1 ponto de vida e, magicamente, renovar 1 ponto de vida próprio"], ["cost", 1]]),
// new Map<string, any>([["name", "Velocidade da Sombra"], ["description", "Esquivar um questionamento do professor"], ["cost", 2]]),
// new Map<string, any>([["name", "Tempo em Suspensão"], ["description", "Adiar a atividade do grupo em 1 semana"], ["cost", 4]]),
// new Map<string, any>([["name", "Toque da Renovação"], ["description", "Curar 1 de vida de 1 membro do grupo"], ["cost", 1]]),
// new Map<string, any>([["name", "Ciclo da Redenção"], ["description", "Refazer uma tarefa em grupo"], ["cost", 5]]),
// new Map<string, any>([["name", "Fênix"], ["description", "Pode reviver qualquer estudante do grupo sem penalidades"], ["cost", 7]]),
// new Map<string, any>([["name", "Barreira do Vigor"], ["description", "Reduzir o dano pela metade"], ["cost", 3]]),
// new Map<string, any>([["name", "Fardo da Solidariedade"], ["description", "Tomar o dano do grupo"], ["cost", 1]]),
// new Map<string, any>([["name", "Arma Secreta"], ["description", "Ganha uma dica para a pergunta do desafio"], ["cost", 2]]),


  let listaPlayers = []
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching records from a specific collection and typecasting to Record[]
        const records = await pb.collection('YOUR_COLLECTION_NAME').getFullList<Record>(); 
        setDataList(records);  // Update the state with the fetched data
        setLoading(false);     // Set loading to false once the data is fetched
      } catch (error) {
        console.error("Error fetching data from PocketBase:", error);
      }
    };

    fetchData(); // Trigger the data fetching
  }, []);

  function objectToMap(obj: any): Map<string, any> {
    const map = new Map<string, any>();
    Object.keys(obj).forEach(key => {
      if (Array.isArray(obj[key])) {
        // If it's an array, recursively apply objectToMap for array elements
        map.set(key, obj[key].map(item => objectToMap(item)));
      } else if (typeof obj[key] === 'object') {
        // If it's an object, convert the nested object to a Map
        map.set(key, objectToMap(obj[key]));
      } else {
        // Otherwise, just set the key-value pair
        map.set(key, obj[key]);
      }
    });
    return map;
  }
  
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
    {listaPlayers.map((values: object) => (
              <GridItem>
               <PlayerCard playerValues={objectToMap(values)} />
              </GridItem>
            ))}
    </Grid>  
    </Box>
  );
}
