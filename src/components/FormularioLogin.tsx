import {
  Flex,
  FormLabel,
  Input,
  FormControl,
  Grid,
  GridItem,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { LoginData } from "../interfaces/LoginData";
// import { useDispatch, useSelector } from "react-redux";

const schema = yup.object({
  emailUsuario: yup
    .string()
    .email("Email inválido")
    .required("Email é obrigatório"),
  senhaUsuario: yup.string().required("Senha é obrigatória"),
});

export default function FormularioLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      emailUsuario: "",
      senhaUsuario: "",
    }
  });

  const onSubmit = async (data: LoginData) => {
    console.log(data);
    reset({
      emailUsuario: "",
      senhaUsuario: ""
    });
  };

  // const { isLoggedin } = useSelector(state => state.auth);
  // const { message } = useSelector(state => state.message)


  // const dispatch = useDispatch(); 

  return (
    <Grid justifyContent="center" alignContent="center">
      <GridItem display="flex">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Endereço de Email</FormLabel>
              <Input {...register("emailUsuario", {required: true})} type="email" />
              {errors.emailUsuario && <Text color='red'>{errors.emailUsuario.message}</Text>}
            </Flex>
            <Flex w="35vw" flexDir="column" mt="5vh">
              <FormLabel>Senha</FormLabel>
              <Input {...register("senhaUsuario", {required: true})} type="password" />
              {errors.senhaUsuario && <Text color='red'>{errors.senhaUsuario.message}</Text>}
            </Flex>
            <Flex justify="center" align="center" mt="5vh">
              <Link href="/reunioesMarcadas">
              <Button type="submit" colorScheme="teal" size="md" mr="10px">
                Entrar
              </Button>
              </Link>
              <Link href="/registrar">
                <Button colorScheme="teal" size="md" ml="10px">
                  Registrar-se
                </Button>
              </Link>
            </Flex>
          </FormControl>
        </form>
      </GridItem>
    </Grid>
  );
}
