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

interface CardConsutaProps {
  isOpen: boolean;
  onClose: () => void;
  reuniao: ReuniaoData | null;
  onUpdate: (reuniaoAtualizada: ReuniaoData) => void;
}

export default function CardConsulta({
  isOpen,
  onClose,
  reuniao,
  onUpdate,
}: CardConsutaProps) {
  const initialRef = React.useRef<HTMLInputElement>(null);

  const [updateReuniaoData, setUpdateReuniaoData] = useState<ReuniaoData>({
    assuntoReuniao: reuniao ? reuniao.assuntoReuniao : "",
    descricaoReuniao: reuniao ? reuniao.descricaoReuniao : "",
    inicioReuniao: reuniao ? reuniao.inicioReuniao : new Date().toISOString(),
    fimReuniao: reuniao ? reuniao.fimReuniao : new Date().toISOString(),
    listaParticipantes: reuniao ? reuniao.listaParticipantes : [],
  });

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
      <Modal isOpen={isOpen} onClose={onClose}>
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
