import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";

export default function FormularioParticipante() {
  return (
    <Grid justifyContent="center" alignContent="center">
      <GridItem display="flex" justifySelf="center">
        <Text fontSize="3xl">Cadastre um Participante</Text>
      </GridItem>
      <GridItem mt="2">
        <FormControl>
          <Flex flexDir="column" w="35vw">
            <FormLabel>Nome do Participante</FormLabel>
            <Input type="text" />
            <FormLabel>Email do Participante</FormLabel>
            <Input type="email" />
            <FormLabel>Telefone do Participante</FormLabel>
            <Input type="tel" />
          </Flex>
        </FormControl>
        <Flex justify="center" align="center">
          <Button mt={4} colorScheme="teal" type="submit">
            Cadastrar
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
}
