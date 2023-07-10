import {
  Button,
  Flex,
  Link,
  Modal,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ReuniaoData } from "../interfaces/ReuniaoData";
import { getAllReunioes, updateReuniao } from "../services/reuniaoService";
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
        const reunioes = await getAllReunioes();
        if (reunioes && reunioes.length > 0) {
          const reunioesMarcadas = reunioes.filter(
            (reuniao: ReuniaoData) => reuniao.reuniaoDesmarcada == true
          );
          setReuniao(reunioesMarcadas);
        } else {
          alert("Não existem reuniões desmarcadas no momento");
        }
      } catch (error) {
        console.error("Erro ao obter as reuniões", error);
      }
    }

    buscarReunioes();
  }, []);

  const marcarReuniao = (reuniao: ReuniaoData) => {
    reuniao.reuniaoDesmarcada = false;
    console.log(reuniao);
    updateReuniao(reuniao.idReuniao!.toString(), reuniao);
  };

  return (
    <Flex justify="center" align="center">
      {reuniao.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Tabela de Reuniões</TableCaption>
            <Thead>
              <Tr>
                <Th>Assunto da Reunião</Th>
                <Th>Data de Inicio</Th>
                <Th>Data de Fim</Th>
                <Th>Consultar</Th>
                <Th>Remarcar Reunião</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reuniao.map((reuniao, index) => (
                <Tr key={index}>
                  <Td>{reuniao.assuntoReuniao}</Td>
                  <Td>
                    {formatarData(reuniao.inicioReuniao!.toLocaleString())}
                  </Td>
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
                      colorScheme="green"
                      textColor="white"
                      onClick={() => marcarReuniao(reuniao)}
                    >
                      Remarcar Reunião
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Flex flexDir="column" justify="center" align="center">
          <Text>Não há nenhuma reunião desmarcada no momento</Text>

          <Link href="/" mt="2%">
            <Button colorScheme="blue" textColor="white">
              Reuniões Agendadas
            </Button>
          </Link>
        </Flex>
      )}

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
