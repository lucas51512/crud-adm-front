import { ReuniaoData } from "./ReuniaoData";

export interface ParticipanteData {
  idParticipante?: number;
  nomeParticipante: string;
  emailParticipante: string;
  telefoneParticipante: string;
  reuniao?: ReuniaoData;
}
