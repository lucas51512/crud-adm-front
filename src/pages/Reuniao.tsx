import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import FormularioReuniao from "../components/FormularioReuniao";

export default function Reuniao() {
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
        <FormularioReuniao />
      </GridItem>
    </Grid>
  );
}
