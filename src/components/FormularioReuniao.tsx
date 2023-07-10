import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Select from "react-select";
import { ReuniaoData } from "../interfaces/ReuniaoData";
import { ParticipanteData } from "../interfaces/ParticipanteData";
import { getAllParticipantes } from "../services/participanteService";
import { createReuniao } from "../services/reuniaoService";

export default function FormularioReuniao() {
  const [participantes, setParticipantes] = useState<ParticipanteData[]>([]);
  const [reuniao, setReuniao] = useState<ReuniaoData>({
    assuntoReuniao: "",
    descricaoReuniao: "",
    observacoes: "",
    reuniaoDesmarcada: false,
    inicioReuniao: "",
    fimReuniao: "",
    listaParticipantes: [],
  });
  const [participanteSelecionado, setParticipanteSelecionado] = useState<
    ParticipanteData[]
  >([
    {
      idParticipante: 0,
      nomeParticipante: "",
      emailParticipante: "",
      telefoneParticipante: "",
    },
  ]);

  const converterData = (dataString: string) => {
    const conversorData = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

    console.log(dataString);

    const match = conversorData.exec(dataString);

    console.log(match);
    if (match != null) {
      const [wholeString, year, month, day, hours, minutes] = match;

      const novaData = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hours),
        parseInt(minutes)
      );

      console.log(novaData.toISOString());

      return novaData.toISOString();
    }
  };

  useEffect(() => {
    async function buscarParticipantes() {
      try {
        await getAllParticipantes().then((participantes) =>
          setParticipantes(participantes)
        );
      } catch (error) {
        console.error("Erro ao obter os participantes", error);
      }
    }

    buscarParticipantes();
  }, []);

  const nomeParticipantes = participantes.map((participante) => {
    return {
      label: participante.nomeParticipante,
      value: participante,
    };
  });

  useEffect(() => {
    async function criarListaParticipantes(
      participanteSelecionado: ParticipanteData[] | ParticipanteData
    ) {
      let novoParticipante: ParticipanteData[];

      if (participanteSelecionado instanceof Array) {
        novoParticipante = participanteSelecionado.map(
          (participante: ParticipanteData) => {
            return {
              idParticipante: participante.idParticipante,
              nomeParticipante: participante.nomeParticipante,
              emailParticipante: participante.emailParticipante,
              telefoneParticipante: participante.telefoneParticipante,
            };
          }
        );
      } else {
        novoParticipante = [
          {
            idParticipante: participanteSelecionado.idParticipante,
            nomeParticipante: participanteSelecionado.nomeParticipante,
            emailParticipante: participanteSelecionado.emailParticipante,
            telefoneParticipante: participanteSelecionado.telefoneParticipante,
          },
        ];
      }
      setReuniao({
        ...reuniao,
        listaParticipantes: novoParticipante.map((participante) => {
          return participante;
        }),
      });
    }

    criarListaParticipantes(participanteSelecionado);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participanteSelecionado]);

  const criarReuniao = (event: any) => {
    event.preventDefault();

    try {
      createReuniao(reuniao).then((reuniao) =>
        console.log("Reunião Criada", reuniao)
      );

      console.log(reuniao.inicioReuniao);
    } catch (error) {
      console.log("Erro ao Criar Reunião", error);
    }

    console.log(reuniao, "Reunião sendo Criada");
  };

  return (
    <Grid justifyContent="center" alignContent="center">
      <GridItem display="flex" justifySelf="center">
        <Text fontSize="3xl">Agende uma Reunião</Text>
      </GridItem>
      <GridItem mt="2">
        <FormControl>
          <Flex w="70vw">
            <Box w="50%" mr="0.5%">
              <FormLabel>Nome da Reunião</FormLabel>
              <Input
                type="text"
                onChange={(event) => {
                  setReuniao({
                    ...reuniao,
                    assuntoReuniao: event.target.value,
                  });
                }}
              />
            </Box>
            <Box w="50%" ml="0.5%">
              <FormLabel>Descrição da Reunião</FormLabel>
              <Input
                type="text"
                onChange={(event) => {
                  setReuniao({
                    ...reuniao,
                    descricaoReuniao: event.target.value,
                  });
                }}
              />
            </Box>
          </Flex>
          <Flex w="70vw">
            <Box w="50%" mr="0.5%">
              <FormLabel>Inicio da Reunião</FormLabel>
              <Input
                type="datetime-local"
                onChange={(event) => {
                  const dataConvertida = converterData(event.target.value);
                  setReuniao({
                    ...reuniao,
                    inicioReuniao: dataConvertida,
                  });
                }}
              />
            </Box>
            <Box w="50%" ml="0.5%">
              <FormLabel>Fim da Reunião</FormLabel>
              <Input
                type="datetime-local"
                onChange={(event) => {
                  const dataConvertida = converterData(event.target.value);
                  setReuniao({
                    ...reuniao,
                    fimReuniao: dataConvertida,
                  });
                }}
              />
            </Box>
          </Flex>
          <Flex w="70vw">
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
            <Box w="50%" ml="0.5%">
              <FormLabel>Observações</FormLabel>
              <Input
                type="text"
                onChange={(event) => {
                  setReuniao({
                    ...reuniao,
                    observacoes: event.target.value,
                  });
                }}
              />
            </Box>
          </Flex>
          <Flex justify="center" align="center">
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={criarReuniao}
            >
              Agendar
            </Button>
          </Flex>
        </FormControl>
      </GridItem>
    </Grid>
  );
}
