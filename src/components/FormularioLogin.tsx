import { Flex, FormLabel, Input, FormControl, Grid, GridItem, Button, Link } from "@chakra-ui/react";

export default function FormularioLogin() {
    return (
        <Grid justifyContent='center' alignContent='center'>
            <GridItem display='flex'>
                <FormControl>
                    <Flex w='35vw' flexDir='column' mt='5vh'>
                        <FormLabel>Endereço de Email</FormLabel>
                        <Input type='email' />
                    </Flex>
                    <Flex w='35vw' flexDir='column' mt='5vh'>
                        <FormLabel>Senha</FormLabel>
                        <Input type='password' />
                    </Flex>
                    <Flex justify='center' align='center' mt='5vh'>
                        <Button colorScheme="teal" size='md' mr='10px'>Login</Button>
                        <Link href="/registrar">
                            <Button colorScheme="teal" size='md' ml='10px'>Registrar-se</Button>
                        </Link>
                    </Flex>
                </FormControl>
            </GridItem>
        </Grid>
    );
}