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
import { ReuniaoData } from "../interfaces/ReuniaoData";
import { deleteReuniao, getAllReunioes } from "../services/reuniaoService";
import { formatarData } from "../helpers/funcoes";
import CardConsulta from "./CardConsulta";

export default function TabelaReuniao() {
  const [reuniao, setReuniao] = useState<ReuniaoData[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reuniaoSelecionada, setReuniaoSelecionada] =
    useState<ReuniaoData | null>(null);

  const abrirModalConsultar = (reuniao: ReuniaoData) => {
    setReuniaoSelecionada(reuniao);
    onOpen();
  };

  const atualizarReuniao = (reuniaoAtualizada: ReuniaoData) => {
    setReuniao((reunioesPrevias) => {
      const reunioesAtualizadas = reunioesPrevias.map((reuniao) => {
        if (reuniao.idReuniao === reuniaoAtualizada.idReuniao) {
          return reuniaoAtualizada;
        }
        return reuniao;
      });
      return reunioesAtualizadas;
    });
  };

  useEffect(() => {
    async function buscarReunioes() {
      try {
        await getAllReunioes().then((reunioes) => {
          setReuniao(reunioes);
        });
      } catch (error) {
        console.error("Erro ao obter as reuniões", error);
      }
    }

    buscarReunioes();
  }, []);

  const deletarReuniao = async (idReuniao: string) => {
    await deleteReuniao(idReuniao);
  };

  return (
    <Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Tabela de Reuniões</TableCaption>
          <Thead>
            <Tr>
              <Th>Assunto da Reunião</Th>
              <Th>Data de Inicio</Th>
              <Th>Data de Fim</Th>
              <Th>Consultar</Th>
              <Th>Desmarcar Reunião</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reuniao.map((reuniao, index) => (
              <Tr key={index}>
                <Td>{reuniao.assuntoReuniao}</Td>
                <Td>{formatarData(reuniao.inicioReuniao!.toLocaleString())}</Td>
                <Td>{formatarData(reuniao.fimReuniao!.toLocaleString())}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    textColor="white"
                    onClick={() => abrirModalConsultar(reuniao)}
                  >
                    Consultar
                  </Button>
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    textColor="white"
                    onClick={() => {
                      deletarReuniao(reuniao.idReuniao!.toString());
                    }}
                  >
                    Desmarcar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        {reuniaoSelecionada && (
          <CardConsulta
            isOpen={isOpen}
            reuniao={reuniaoSelecionada}
            onClose={onClose}
            onUpdate={atualizarReuniao}
          />
        )}
      </Modal>
    </Flex>
  );
}
