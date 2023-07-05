import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReunioesAgendadas from "./pages/ReunioesAgendadas";
import Reuniao from "./pages/Reuniao";
import Participante from "./pages/Participante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReunioesAgendadas />} />
        <Route path="/reuniao" element={<Reuniao />} />
        <Route path="/participante" element={<Participante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
