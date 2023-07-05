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
import React, { useEffect, useState } from "react";
import { ParticipanteData } from "../interfaces/ParticipanteData";
import { useParams } from "react-router";
import {
  getParticipante,
  updateParticipante,
} from "../services/participanteService";

interface CardConsutaProps {
  isOpen: boolean;
  onClose: () => void;
  participante: ParticipanteData | null;
  onUpdate: (participanteAtualizada: ParticipanteData) => void;
}

export default function CardConsulta({
  isOpen,
  onClose,
  participante,
  onUpdate,
}: CardConsutaProps) {
  const initialRef = React.useRef<HTMLInputElement>(null);

  const [updateParticipanteData, setUpdateParticipanteData] =
    useState<ParticipanteData>({
      nomeParticipante: participante ? participante.nomeParticipante : "",
      emailParticipante: participante ? participante.emailParticipante : "",
      telefoneParticipante: participante
        ? participante.telefoneParticipante
        : "",
    });

  useEffect(() => {
    if (participante) setUpdateParticipanteData(participante);
  }, [participante]);

  const atualizarParticipante = async () => {
    try {
      if (participante) {
        const numeroParticipante = participante.idParticipante!.toString();
        const { reuniao, ...participanteSemReuniao } = updateParticipanteData;
        console.log(participanteSemReuniao);

        await updateParticipante(numeroParticipante, participanteSemReuniao);

        onUpdate(updateParticipanteData);
        onClose();
      }
    } catch (error) {
      console.error(
        "Erro ao atualizar o Participante ",
        participante?.idParticipante,
        error
      );
    }
  };

  const controladorDeMudancas =
    (campo: keyof typeof updateParticipanteData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setUpdateParticipanteData((estadoAnterior) => ({
        ...estadoAnterior,
        [campo]: value,
      }));
    };

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Participantes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {participante && (
              <Flex>
                <FormControl>
                  <FormLabel>Nome do Participante</FormLabel>
                  <Input
                    ref={initialRef}
                    type="text"
                    defaultValue={participante.nomeParticipante}
                    placeholder="Assunto da Reunião"
                    onChange={controladorDeMudancas("nomeParticipante")}
                  />
                  <FormLabel>Email do Participante</FormLabel>
                  <Input
                    ref={initialRef}
                    type="email"
                    defaultValue={participante.emailParticipante}
                    placeholder="Descrição da Reunião"
                    onChange={controladorDeMudancas("emailParticipante")}
                  />
                  <FormLabel>Telefone do Participante</FormLabel>
                  <Input
                    ref={initialRef}
                    type="tel"
                    defaultValue={participante.telefoneParticipante}
                    placeholder="Data da Reunião"
                    onChange={controladorDeMudancas("telefoneParticipante")}
                  />
                </FormControl>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={atualizarParticipante}>
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
