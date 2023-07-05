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
import { getReuniao, updateReuniao } from "../services/reuniaoService";
import { useParams } from "react-router";
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

  const parametros = useParams();

  const [updateReuniaoData, setUpdateReuniaoData] = useState<ReuniaoData>({
    assuntoReuniao: reuniao ? reuniao.assuntoReuniao : "",
    descricaoReuniao: reuniao ? reuniao.descricaoReuniao : "",
    inicioReuniao: reuniao ? reuniao.inicioReuniao : new Date().toISOString(),
    fimReuniao: reuniao ? reuniao.fimReuniao : new Date().toISOString(),
    listaParticipantesObjetos: reuniao ? reuniao.listaParticipantesObjetos : [],
  });

  useEffect(() => {
    if (parametros.idReuniao) {
      getReuniao(parametros.idReuniao).then((resposta) =>
        setUpdateReuniaoData(resposta.data)
      );
    }
  }, [reuniao]);

  const atualizarReuniao = async () => {
    try {
      if (reuniao)
        await updateReuniao(reuniao.idReuniao!.toString(), updateReuniao);
      onUpdate(updateReuniaoData);
      onClose();
    } catch (error) {
      console.error(
        "Erro ao atualizar o Participante ",
        reuniao?.idReuniao,
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
                  />
                  <FormLabel>Descrição da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    defaultValue={reuniao.descricaoReuniao}
                    placeholder="Descrição da Reunião"
                  />
                  <FormLabel>Inicio da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    type="datetime-local"
                    defaultValue={imprimeDataInput(reuniao.inicioReuniao!)}
                    placeholder="Data da Reunião"
                    onClick={() => {
                      console.log(reuniao.inicioReuniao!);
                    }}
                  />
                  <FormLabel>Fim da Reunião</FormLabel>
                  <Input
                    ref={initialRef}
                    type="datetime-local"
                    defaultValue={imprimeDataInput(reuniao.fimReuniao!)}
                    placeholder="Data da Reunião"
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
