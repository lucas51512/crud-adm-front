import { Flex, Grid, GridItem, Text, Link } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Grid w="100vw" h="60px" bgColor="gray.200" alignContent="center">
      <GridItem display="flex" justifyContent="space-around">
        <Flex>
          <Text pl="3">Crud Reuniões</Text>
        </Flex>
        <Flex>
          <Link href="/reunioesMarcadas">
            <Text pl="3">Reuniões Cadastradas</Text>
          </Link>
          <Link href="/reuniao">
            <Text pl="3">Cadastrar Reuniao</Text>
          </Link>
          <Link href="/participante">
            <Text pl="3">Cadastrar Participantes</Text>
          </Link>
          <Link href="/participantesCadastrados">
            <Text pl="3">Participantes Cadastrados</Text>
          </Link>
        </Flex>
      </GridItem>
    </Grid>
  );
}
