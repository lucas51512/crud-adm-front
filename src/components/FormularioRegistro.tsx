import {
  Flex,
  FormLabel,
  Input,
  FormControl,
  Grid,
  GridItem,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UsuarioData } from "../interfaces/UsuartioData";
import { createUsuario } from "../services/usuarioService";

const schema = yup.object({
  nomeUsuario: yup.string().required("Nome de usuário é obrigatório"),
  emailUsuario: yup.string().email("Email inválido").required("Email é obrigatório"),
  senhaUsuario: yup.string().required("Senha é obrigatória"),
});

export default function FormularioRegistro() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast()

  const onSubmit = async (data: UsuarioData) => {
    console.log(data);

    try {
      createUsuario(data);

    } catch (error) {
      console.log("Erro ao criar a reunião", error)
    }

    reset({
      nomeUsuario: "",
      emailUsuario: "",
      senhaUsuario: ""
    });

    toast({
      title: 'Conta criada com Sucesso!',
      description: 'Nós estamos criando a sua conta para você.',
      status: 'success',
      duration: 5000,
      isClosable: true
    })
    
  };

  return (
    <Grid justifyContent="center" alignContent="center">
      <GridItem display="flex">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Nome de Usuário</FormLabel>
              <Input {...register("nomeUsuario", {required: true})} type="text" />
              {errors.nomeUsuario && <Text color='red'>{errors.nomeUsuario.message}</Text>}
            </Flex>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Endereço de Email</FormLabel>
              <Input {...register("emailUsuario")} type="email" />
              {errors.emailUsuario && <Text color='red'>{errors.emailUsuario.message}</Text>}
            </Flex>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Senha</FormLabel>
              <Input {...register("senhaUsuario")} type="password" />
              {errors.senhaUsuario && <Text color='red'>{errors.senhaUsuario.message}</Text>}
            </Flex>
            <Flex justify="center" align="center" mt="5vh">
              <Button colorScheme="teal" size="md" type="submit" ml="10px">
                Registrar-se
              </Button>
            </Flex>
          </FormControl>
        </form>
      </GridItem>
    </Grid>
  );
}
