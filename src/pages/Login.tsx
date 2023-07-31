import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import FormularioLogin from "../components/FormularioLogin";

export default function Login(){
    return(<Grid
    templateAreas={`    "titulo titulo titulo"
                        "menu menu menu"
                        "footer footer footer"`}
  >

    <GridItem area='titulo' display='flex' justifyContent='center' alignContent='center' mt='5vh'>
      <Flex  flexDir='column'>
      <Text fontSize='3xl' textAlign='center'>Bem vindo ao Sistema de Reuniões!</Text>
      <Text fontSize='xl' textAlign='center'>Faça Login Abaixo</Text>

      </Flex>
    </GridItem>
    <GridItem area="menu" mt='5vh'>
      <FormularioLogin />
    </GridItem>
  </Grid>);
}