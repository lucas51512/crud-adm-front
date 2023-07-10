import { Box, FormLabel } from "@chakra-ui/react";
import Select from "react-select";
import { ParticipanteData } from "../interfaces/ParticipanteData";

interface SelectParticipantesProps {
  participantes: ParticipanteData;
}

export default function SelectParticipantes() {
  const nomeParticipantes = participantes.map((participante) => {
    return {
      label: participante.nomeParticipante,
      value: participante,
    };
  });

  return (
    <Box w="50%" mr="0.5%">
      <FormLabel>Selecionar Participantes</FormLabel>
      <Select
        placeholder="Participantes Disponíveis"
        isMulti
        options={nomeParticipantes}
        onChange={(event) => {
          setParticipanteSelecionado(
            event.map((participante) => participante.value)
          );
        }}
      />
    </Box>
  );
}
