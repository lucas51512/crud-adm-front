import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import TabelaReuniao from "../components/TabelaReuniao";

export default function ReunioesMarcadas() {
  return (
    <Grid
      templateAreas={`"navbar navbar navbar"
                          "menu menu menu"
                          "footer footer footer"`}
    >
      <GridItem area="navbar">
        <Navbar />
      </GridItem>
      <GridItem area="menu" h="30%">
        <Flex justify="center" align="center" flexDir="column">
          <Text fontSize="3xl">Bem Vindo ao Cadastro de Reuniões!</Text>
        </Flex>
        <Flex justify="center" align="center" flexDir="column">
          <Text textAlign="justify" w="50%" marginY="1%">
            O sistema de Agendamento de Reuniões permite que os usuários criem,
            visualizem, atualizem e excluam agendamentos de reuniões. Com esse
            sistema, é possível organizar e gerenciar todas as suas reuniões de
            forma eficiente.
          </Text>
          <Text textAlign="justify" w="50%" marginY="1%">
            Ao visualizar a lista de agendamentos de reuniões, você poderá ver
            os detalhes de cada reunião, incluindo o título, data, horário de
            início, horário de término e local. Você também pode editar ou
            excluir um agendamento existente, caso seja necessário fazer
            alterações ou cancelar uma reunião.
          </Text>
        </Flex>
        <Flex justify="center" align="center">
          <TabelaReuniao />
        </Flex>
      </GridItem>
      <GridItem></GridItem>
    </Grid>
  );
}
