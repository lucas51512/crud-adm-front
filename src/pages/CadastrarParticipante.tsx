import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import FormularioParticipante from "../components/FormularioParticipante";

export default function CadastrarParticipante() {
  return (
    <Grid
      templateAreas={`"navbar navbar navbar"
                          "menu menu menu"
                          "footer footer footer"`}
    >
      <GridItem area="navbar">
        <Navbar />
      </GridItem>
      <GridItem area="menu">
        <FormularioParticipante />
      </GridItem>
    </Grid>
  );
}
