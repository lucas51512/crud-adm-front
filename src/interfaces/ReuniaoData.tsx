import { ParticipanteData } from "./ParticipanteData";

export interface ReuniaoData {
  idReuniao?: number;
  assuntoReuniao: string;
  descricaoReuniao: string;
  inicioReuniao?: null | string;
  fimReuniao?: null | string;
  listaParticipantesObjetos: ParticipanteData[];
}
