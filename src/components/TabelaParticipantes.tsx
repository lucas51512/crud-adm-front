import {
  Button,
  Flex,
  Modal,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ParticipanteData } from "../interfaces/ParticipanteData";
import {
  deleteParticipante,
  getAllParticipantes,
} from "../services/participanteService";
import CardParticipante from "./CardParticipante";

export default function TabelaParticipante() {
  const [participante, setParticipante] = useState<ParticipanteData[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [participanteSelecionado, setParticipanteSelecionada] =
    useState<ParticipanteData | null>(null);

  const abrirModalConsultar = (participante: ParticipanteData) => {
    setParticipanteSelecionada(participante);
    onOpen();
  };

  const atualizarParticipante = (participanteAtualizada: ParticipanteData) => {
    setParticipante((reunioesPrevias) => {
      const reunioesAtualizadas = reunioesPrevias.map((participante) => {
        if (
          participante.idParticipante === participanteAtualizada.idParticipante
        ) {
          return participanteAtualizada;
        }
        return participante;
      });
      return reunioesAtualizadas;
    });
  };

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

  const deletarParticipante = async (idParticipante: string) => {
    await deleteParticipante(idParticipante);
  };

  return (
    <Flex justify="center" marginY="1%">
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Tabela de Participantes</TableCaption>
          <Thead>
            <Tr>
              <Th>Nome do Participante</Th>
              <Th>Email do Participante</Th>
              <Th>Telefone do Participante</Th>
              <Th>Alterar</Th>
              <Th>Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {participante.map((participante, index) => (
              <Tr key={index}>
                <Td>{participante.nomeParticipante}</Td>
                <Td>{participante.emailParticipante}</Td>
                <Td>{participante.telefoneParticipante}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    textColor="white"
                    onClick={() => abrirModalConsultar(participante)}
                  >
                    Alterar
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    textColor="white"
                    onClick={() => {
                      deletarParticipante(
                        participante.idParticipante!.toString()
                      );
                    }}
                  >
                    Excluir
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        {participanteSelecionado && (
          <CardParticipante
            isOpen={isOpen}
            participante={participanteSelecionado}
            onClose={onClose}
            onUpdate={atualizarParticipante}
          />
        )}
      </Modal>
    </Flex>
  );
}
