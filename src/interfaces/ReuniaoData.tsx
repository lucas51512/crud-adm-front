import { LocalData } from "./LocalData";
import { ParticipanteData } from "./ParticipanteData";

export interface ReuniaoData {
  idReuniao?: number;
  assuntoReuniao: string;
  descricaoReuniao: string;
  observacoes: string;
  reuniaoDesmarcada: boolean;
  inicioReuniao?: null | string;
  fimReuniao?: null | string;
  listaParticipantes: ParticipanteData[];
  localReuniao?: LocalData;
}
