import {
  Flex,
  FormLabel,
  Input,
  FormControl,
  Grid,
  GridItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  nomeUsuario: yup.string().required("Nome de usuário é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export default function FormularioRegistro() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <Grid justifyContent="center" alignContent="center">
      <GridItem display="flex">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Nome de Usuário</FormLabel>
              <Input {...register("nomeUsuario", {required: true})} type="text" />
              {errors.nomeUsuario && <Text color='red'>{errors.nomeUsuario?.message}</Text>}
            </Flex>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Endereço de Email</FormLabel>
              <Input {...register("email")} type="email" />
              {errors.email && <Text color='red'>{errors.email?.message}</Text>}
            </Flex>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Senha</FormLabel>
              <Input {...register("password")} type="password" />
              {errors.password && <Text color='red'>{errors.password?.message}</Text>}
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
