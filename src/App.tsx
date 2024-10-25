import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Faq from './pages/Faq';
import PreviousCalls from './pages/PreviousCalls';
import About from './pages/About';
import TicketDetailsPage from './pages/TicketDetails'; // Importe a página de detalhes do ticket
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1028) {
        
        setIsMobile(true);
      } else {
       ;
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className={` flex ${isMobile ? `flex-col` : `flex-row` } `}>
        <div className='bg-[#2A2A2A] '>
        <Topbar /> {/* Adiciona o menu lateral */}
        </div>
        <div className="flex-1 text-white">
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/previous-calls" element={<PreviousCalls />} />
            <Route path="/about" element={<About />} />
            <Route path="/adm-previous-calls" element={ <AdmPreviousCalls /> } />
            <Route path="/ticket/:idTicket" element={<TicketDetailsPage />} /> {/* Adiciona a rota para detalhes do ticket */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
