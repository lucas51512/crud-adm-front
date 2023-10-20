import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ParticipanteData } from "../interfaces/ParticipanteData";
import { createParticipante } from "../services/participanteService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function FormularioParticipante() {
  const [novoParticipante, setNovoParticipante] = useState<ParticipanteData>({
    nomeParticipante: "",
    emailParticipante: "",
    telefoneParticipante: "",
  });
  const telefoneRegExp =
  /^\(\d{2}\)\d{9}$/;

  const schema = yup.object({
    nomeParticipante: yup
      .string()
      .required("Nome do participante é obrigatório"),
    emailParticipante: yup
      .string()
      .email("Email inválido")
      .required("Email é obrigatório"),
    telefoneParticipante: yup
      .string()
      .matches(telefoneRegExp, "Telefone não é válido"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const onSubmit = async (data: ParticipanteData) => {
    console.log(data);

    createParticipante(novoParticipante)
      .then(() => {
        console.log("Participante criado com sucesso!", novoParticipante);
        toast({
          title: `Participante ${data.nomeParticipante} criado com Sucesso!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(novoParticipante);
        console.log("Erro ao criar o participante", error);
      });

    reset({
      nomeParticipante: "",
      emailParticipante: "",
      telefoneParticipante: "",
    });
  };

  return (
    <Grid justifyContent="center" alignContent="center">
      <GridItem display="flex" justifySelf="center">
        <Text fontSize="3xl">Cadastre um Participante</Text>
      </GridItem>
      <GridItem mt="2">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl>
            <Flex flexDir="column" w="35vw">
              <FormLabel>Nome do Participante</FormLabel>
              <Input
                type="text"
                {...register("nomeParticipante", { required: true })}
                onChange={(event) => {
                  setNovoParticipante({
                    ...novoParticipante,
                    nomeParticipante: event.target.value,
                  });
                }}
              />
              {errors.nomeParticipante && <Text color='red'>{errors.nomeParticipante.message}</Text>}
              <FormLabel>Email do Participante</FormLabel>
              <Input
                type="email"
                {...register("emailParticipante", { required: true })}
                onChange={(event) => {
                  setNovoParticipante({
                    ...novoParticipante,
                    emailParticipante: event.target.value,
                  });
                }}
              />
              {errors.emailParticipante && <Text color='red'>{errors.emailParticipante.message}</Text>}
              <FormLabel>Telefone do Participante</FormLabel>
              <Input
                type="tel"
                {...register("telefoneParticipante")}
                onChange={(event) => {
                  setNovoParticipante({
                    ...novoParticipante,
                    telefoneParticipante: event.target.value,
                  });
                }}
              />
              {errors.telefoneParticipante && <Text color='red'>{errors.telefoneParticipante.message}</Text>}
            </Flex>
            <Flex justify="center" align="center">
              <Button mt={4} colorScheme="teal" type="submit">
                Cadastrar
              </Button>
            </Flex>
          </FormControl>
        </form>
      </GridItem>
    </Grid>
  );
}
