import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import FormularioRegistro from "../components/FormularioRegistro";

export default function Registro(){
    return(<Grid
    templateAreas={`    "titulo titulo titulo"
                        "menu menu menu"
                        "footer footer footer"`}
  >

    <GridItem area='titulo' display='flex' justifyContent='center' alignContent='center' mt='5vh'>
      <Flex  flexDir='column'>
      <Text fontSize='3xl' textAlign='center'>Bem vindo ao Sistema de Reuniões!</Text>
      <Text fontSize='xl' textAlign='center'>Registre-se Abaixo</Text>

      </Flex>
    </GridItem>
    <GridItem area="menu" mt='5vh'>
      <FormularioRegistro />
    </GridItem>
  </Grid>);
}