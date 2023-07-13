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
import { updateParticipante } from "../services/participanteService";

interface CardConsutaProps {
  isOpen: boolean;
  onClose: () => void;
  participante: ParticipanteData | null;
  onUpdate: (participanteAtualizada: ParticipanteData) => void;
}

export default function CardReunioes({
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

  return (
    <Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                    onChange={(event) => {
                      setUpdateParticipanteData({
                        ...updateParticipanteData,
                        nomeParticipante: event.target.value,
                      });
                    }}
                  />
                  <FormLabel>Email do Participante</FormLabel>
                  <Input
                    ref={initialRef}
                    type="email"
                    defaultValue={participante.emailParticipante}
                    placeholder="Descrição da Reunião"
                    onChange={(event) => {
                      setUpdateParticipanteData({
                        ...updateParticipanteData,
                        emailParticipante: event.target.value,
                      });
                    }}
                  />
                  <FormLabel>Telefone do Participante</FormLabel>
                  <Input
                    ref={initialRef}
                    type="tel"
                    defaultValue={participante.telefoneParticipante}
                    placeholder="Data da Reunião"
                    onChange={(event) => {
                      setUpdateParticipanteData({
                        ...updateParticipanteData,
                        telefoneParticipante: event.target.value,
                      });
                    }}
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
