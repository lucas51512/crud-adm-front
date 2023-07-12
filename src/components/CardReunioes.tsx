import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ReuniaoData } from "../interfaces/ReuniaoData";
import { updateReuniao } from "../services/reuniaoService";
import { imprimeDataInput } from "../helpers/funcoes";
import Select from "react-select";
import { ParticipanteData } from "../interfaces/ParticipanteData";
import { getAllParticipantes } from "../services/participanteService";

interface CardConsutaProps {
  isOpen: boolean;
  onClose: () => void;
  reuniaoPassada: ReuniaoData;
  onUpdate: (reuniaoAtualizada: ReuniaoData) => void;
}

export default function CardReunioes({
  isOpen,
  onClose,
  reuniaoPassada,
  onUpdate,
}: CardConsutaProps) {
  const initialRef = React.useRef<HTMLInputElement>(null);

  const [reuniao, setReuniao] = useState<ReuniaoData>(reuniaoPassada);

  const [participante, setParticipante] = useState<ParticipanteData[]>([]);

  useEffect(() => {
    async function buscarParticipantes() {
      try {
        await getAllParticipantes().then((participantes) =>
          setParticipante(participantes)
        );
      } catch (error) {
        console.error("Erro ao obter as reuniões", error);
      }
    }

    buscarParticipantes();
  }, []);

  const nomeParticipantes = participante.map((participante) => {
    return {
      label: participante.nomeParticipante,
      value: participante,
    };
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

  const [updateReuniaoData, setUpdateReuniaoData] = useState<ReuniaoData>({
    assuntoReuniao: reuniao ? reuniao.assuntoReuniao : "",
    descricaoReuniao: reuniao ? reuniao.descricaoReuniao : "",
    observacoes: reuniao ? reuniao.observacoes : "",
    reuniaoDesmarcada: reuniao ? reuniao.reuniaoDesmarcada : false,
    inicioReuniao: reuniao ? reuniao.inicioReuniao : new Date().toISOString(),
    fimReuniao: reuniao ? reuniao.fimReuniao : new Date().toISOString(),
    listaParticipantes: reuniao ? reuniao.listaParticipantes : [],
  });

  useEffect(() => {
    setParticipanteSelecionado(participante);
  }, [participante]);

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

  useEffect(() => {
    if (reuniao) setUpdateReuniaoData(reuniao);
  }, [reuniao]);

  const atualizarReuniao = async () => {
    try {
      if (updateReuniaoData) {
        const numeroReuniao = updateReuniaoData.idReuniao!.toString();
        console.log(updateReuniaoData);

        await updateReuniao(numeroReuniao, updateReuniaoData);

        onUpdate(updateReuniaoData);
        onClose();
      }
    } catch (error) {
      console.error(
        "Erro ao atualizar a Reuniao",
        updateReuniaoData?.idReuniao,
        error
      );
    }
  };

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reuniões</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {reuniao && (
              <Flex>
                <FormControl>
                  <FormLabel>Assunto da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    defaultValue={reuniao.assuntoReuniao}
                    placeholder="Assunto da Reunião"
                    onChange={(event) => {
                      setUpdateReuniaoData({
                        ...updateReuniaoData,
                        assuntoReuniao: event.target.value,
                      });
                    }}
                  />
                  <FormLabel>Descrição da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    defaultValue={reuniao.descricaoReuniao}
                    placeholder="Descrição da Reunião"
                    onChange={(event) => {
                      setUpdateReuniaoData({
                        ...updateReuniaoData,
                        descricaoReuniao: event.target.value,
                      });
                    }}
                  />
                  <FormLabel>Observações da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    defaultValue={reuniao.observacoes}
                    placeholder="Observações da Reunião"
                    onChange={(event) => {
                      setUpdateReuniaoData({
                        ...updateReuniaoData,
                        observacoes: event.target.value,
                      });
                    }}
                  />
                  <FormLabel>Inicio da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    type="datetime-local"
                    defaultValue={imprimeDataInput(reuniao.inicioReuniao!)}
                    placeholder="Data da Reunião"
                    onChange={(event) => {
                      setUpdateReuniaoData({
                        ...updateReuniaoData,
                        inicioReuniao: event.target.value,
                      });
                    }}
                  />
                  <FormLabel>Fim da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    type="datetime-local"
                    defaultValue={imprimeDataInput(reuniao.fimReuniao!)}
                    placeholder="Data da Reunião"
                    onChange={(event) => {
                      setUpdateReuniaoData({
                        ...updateReuniaoData,
                        fimReuniao: event.target.value,
                      });
                    }}
                  />
                  <FormLabel>Participantes Selecionados</FormLabel>
                  <Select
                    placeholder="Participantes Disponíveis"
                    isMulti
                    options={nomeParticipantes}
                    defaultValue={reuniao.listaParticipantes.map(
                      (participante) => ({
                        value: participante,
                        label: participante.nomeParticipante,
                      })
                    )}
                    onChange={() => {
                      console.log(reuniao.listaParticipantes);
                    }}
                  />
                </FormControl>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={atualizarReuniao}>
              Salvar
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}