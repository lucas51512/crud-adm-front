import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReunioesMarcadas from "./pages/ReunioesMarcadas";
import CadastrarReuniao from "./pages/CadastrarReuniao";
import CadastrarParticipante from "./pages/CadastrarParticipante";
import ParticipantesCadastrados from "./pages/ParticipantesCadastrados";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReunioesMarcadas />} />
        <Route path="/reuniao" element={<CadastrarReuniao />} />
        <Route path="/participante" element={<CadastrarParticipante />} />
        <Route
          path="/participantesCadastrados"
          element={<ParticipantesCadastrados />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
