import { Card, CardHeader, CardBody, Heading, Text, Box, Stack, StackDivider, Grid, GridItem, Container, Divider } from '@chakra-ui/react'

interface PlayerProps {
  playerValues: Map<string, any>;
}

export class Skill {
  name: string;
  description: string;
  cost: number;

  constructor(
    name: string,
    description: string,
    cost: number
  ) {
    this.name = name;
    this.description = description;
    this.cost = cost;
  }
};

export class Player {
  playerName: string;
  level: number;
  xpMax: number;
  xpActual: number;
  playerClass: string;
  cristalsCount: number;
  hpTotal: number;
  hpRelative: number;
  habilities: Skill[];

  constructor(
    playerValues: Map<string, any>,
  ) {
    this.playerName = playerValues.get("playerName") ?? "Unknown Player";
    this.level = playerValues.get("level") ?? 1;
    this.xpMax = playerValues.get("xp_max") ?? 100;
    this.xpActual = playerValues.get("xpActual") ?? 0;
    this.playerClass = playerValues.get("playerClass") ?? "No Class";
    this.cristalsCount = playerValues.get("cristalsCount") ?? 0;
    this.hpRelative = playerValues.get("hpRelative") ?? 100;
    this.hpTotal = playerValues.get("hpTotal") ?? 100;
    this.habilities = [];

    playerValues.get("abilities").forEach((element: Map<string, any>) => {
      let skill: Skill = new Skill(
        element.get("name"),
        element.get("description"),
        element.get("cost")
      );
      this.habilities.push(skill)
    });
  }
}

export function SkillCard(skill: Skill) {
  return (
    <Container bg='blackAlpha.50' borderRadius='2xl' border={'1px'}>
      <Text>{skill.name}</Text>
      <Divider/>
      <Text fontStyle='italic' color="gray.500">"{skill.description}"</Text>
      <Text>Custo por uso: {skill.cost} Cristais</Text>
    </Container>
  );
}

export function PlayerCard(playerValues: PlayerProps) {

  const player: Player = new Player(playerValues.playerValues);
  return (
    <Container>
    <Card borderRadius='2xl' border={'1px'}>
      
      <CardHeader textAlign="center">
        <Heading size='md'>{player.playerName}</Heading>
      </CardHeader>
      <CardBody>
        <Divider/>
        {/* TRAMPO PRA CARALHO PRA PULAR UMA LINHASSS */}
        <br></br>
        <Stack divider={<StackDivider />} spacing='4'>
        <Grid 
        gap={1} 
        templateRows='repeat(2)' 
        templateColumns='repeat(5)'
        justifyItems="center"
        alignItems="center"
        textAlign="center"
        >
          <GridItem>
            <Box>
            <Heading size='xs' textTransform='uppercase'>
              Level
            </Heading>
            <Text pt='2' fontSize='sm'>{player.level}</Text>
          </Box>
          </GridItem>
          <GridItem>
            <Box>
            <Heading size='xs' textTransform='uppercase'>
              XP
            </Heading>
            <Text pt='2' fontSize='sm'>{player.xpActual} / {player.xpMax}</Text>
          </Box>
          </GridItem>
          <GridItem gridRow={2}>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              HP
            </Heading>
            <Text pt='2' fontSize='sm'> {player.hpRelative} / {player.hpTotal}</Text>
          </Box>
          </GridItem>
          <GridItem gridRow={2}>
            <Box>
            <Heading size='xs' textTransform='uppercase'>
              Cristais
            </Heading>
            <Text pt='2' fontSize='sm'>{player.cristalsCount}</Text>
          </Box>
          </GridItem>
        </Grid>
          <Box textAlign="center">
            <Heading size='xs' textTransform='uppercase'>
              Classe
            </Heading>
            <Text pt='2' fontSize='sm'>{player.playerClass}</Text>
          </Box>
          <Box>
            <Heading textAlign="center" size='xs' textTransform='uppercase'>
              Habilidades
            </Heading>
            <Grid 
            templateRows={`repeat(${Math.ceil(player.habilities.length / 2)}, 1fr)`}
            gap={2}
            templateColumns='repeat(2, 1fr)'
            >
            {player.habilities.map((item: Skill, index) => (
              <GridItem>
              <SkillCard key={item.name} {...item} />
              </GridItem>
            ))}
            </Grid>
          </Box>
        </Stack>
      </CardBody>
    </Card>
    </Container>
  );
}

