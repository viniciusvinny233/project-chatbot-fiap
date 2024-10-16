import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Faq from './pages/Faq';
import PreviousCalls from './pages/PreviousCalls';
import About from './pages/About';
import TicketDetailsPage from './pages/TicketDetails'; // Importe a página de detalhes do ticket

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex bg-[#2A2A2A] ">
        <div className='border-gradient-right'>
          <Sidebar />
        </div>
        <div className="flex-1 text-white bg-[#1a1a1a]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/previous-calls" element={<PreviousCalls />} />
            <Route path="/about" element={<About />} />
            <Route path="/ticket/:idTicket" element={<TicketDetailsPage />} /> {/* Adiciona a rota para detalhes do ticket */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
