import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import TabelaParticipante from "../components/TabelaParticipantes";

export default function ParticipantesCadastrados() {
  return (
    <Grid
      templateAreas={`"navbar navbar navbar"
                          "menu menu menu"
                          "footer footer footer"`}
    >
      <GridItem area="navbar">
        <Navbar />
      </GridItem>
      <GridItem area="menu">
        <Flex justify="center" align="center" flexDir="column" m="1%">
          <Text fontSize="3xl">Participantes Cadastrados</Text>
        </Flex>
        <TabelaParticipante />
      </GridItem>
    </Grid>
  );
}
