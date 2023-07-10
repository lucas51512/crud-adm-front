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
import { useState } from "react";
import { ParticipanteData } from "../interfaces/ParticipanteData";
import { createParticipante } from "../services/participanteService";

export default function FormularioParticipante() {
  const [novoParticipante, setNovoParticipante] = useState<ParticipanteData>({
    nomeParticipante: "",
    emailParticipante: "",
    telefoneParticipante: "",
  });

  const criaParticipante = (event: any) => {
    event.preventDefault();

    createParticipante(novoParticipante)
      .then(() => {
        console.log("Participante criado com sucesso!", novoParticipante);
      })
      .catch((error) => {
        console.log(novoParticipante);
        console.log("Erro ao criar o participante", error);
      });
  };

  return (
    <Grid justifyContent="center" alignContent="center">
      <GridItem display="flex" justifySelf="center">
        <Text fontSize="3xl">Cadastre um Participante</Text>
      </GridItem>
      <GridItem mt="2">
        <FormControl>
          <Flex flexDir="column" w="35vw">
            <FormLabel>Nome do Participante</FormLabel>
            <Input
              type="text"
              onChange={(event) => {
                setNovoParticipante({
                  ...novoParticipante,
                  nomeParticipante: event.target.value,
                });
              }}
            />
            <FormLabel>Email do Participante</FormLabel>
            <Input
              type="email"
              onChange={(event) => {
                setNovoParticipante({
                  ...novoParticipante,
                  emailParticipante: event.target.value,
                });
              }}
            />
            <FormLabel>Telefone do Participante</FormLabel>
            <Input
              type="tel"
              onChange={(event) => {
                setNovoParticipante({
                  ...novoParticipante,
                  telefoneParticipante: event.target.value,
                });
              }}
            />
          </Flex>
        </FormControl>
        <Flex justify="center" align="center">
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            onClick={criaParticipante}
          >
            Cadastrar
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  );
}
