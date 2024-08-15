import React, { useState, useEffect } from 'react';

import HomeIcon from '../assets/images/pagina-inicial.png';
import ChatbotIcon from '../assets/images/chatbot.png';
import LogoMenu from '../assets/images/logo-menu.png';
import FaqIcon from '../assets/images/perguntas-frequentes.png';
import PreviousCallsIcon from '../assets/images/chamados-anteriores.png';
import AboutIcon from '../assets/images/sobre.png';
import LupaIcon from '../assets/images/4.png';
import SetaEsquerda from '../assets/images/arrow_left.png';
import SetaDireita from '../assets/images/arrow_right.png';

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1028) {
        setIsCollapsed(true);
        setIsMobile(true);
      } else {
        setIsCollapsed(false);
        setIsMobile(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`relative  ${isMobile ? 'z-50 w-20' : 'flex'} `}>
      <div
        className={`h-screen bg-[#2A2A2A] text-white flex flex-col p-4 transition-all duration-300 ${
          isCollapsed ? (isMobile ? 'w-20 relative'  : 'w-20 relative') : 'w-72 relative'
        } ${isMobile && isCollapsed ? 'absolute' : ''} ${
          isMobile && !isCollapsed ? 'absolute left-0 w-72' : ''
        }`}
        style={{ position: isMobile ? 'absolute' : 'relative' }}
      >
        <div className="flex items-center mb-12 justify-between">
          <img src={LogoMenu} alt="Icon" className={`min-w-14 h-14 ${isCollapsed ? 'ml-1 min-w-[2.5rem] h-[2.5rem]' : ''}`} />
          {!isCollapsed && (
            <span className="text-[2.6rem] font-extrabold text-[#92DCE1] font-montserrat">CATECH</span>
          )}
        </div>
        <div className={`flex items-center mb-12 relative ${isCollapsed ? 'justify-center' : ''}`}>
          {!isCollapsed && (
            <>
              <input
                type="text"
                className="w-full px-3 py-3 pl-5 pr-11 rounded-full bg-[rgba(191,243,255,0.5)] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <img src={LupaIcon} alt="Search" className="absolute right-4 w-5 h-5" />
            </>
          )}
        </div>
        <nav className={`flex flex-col space-y-8 text-[#BFF3FF] text-base`}>
          <a
            href="/"
            className={`flex items-center space-x-2 hover:text-blue-500 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <img src={HomeIcon} alt="Página Inicial" className="w-8 h-8 mr-1 " />
            {!isCollapsed && <span className="text-lg">Página Inicial</span>}
          </a>
          <a
            href="chatbot"
            className={`flex items-center space-x-2 hover:text-blue-500 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <img src={ChatbotIcon} alt="Chatbot" className="w-8 h-8 mr-1" />
            {!isCollapsed && <span className="text-lg">Chatbot</span>}
          </a>
          <a
            href="faq"
            className={`flex items-center space-x-2 hover:text-blue-500 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <img src={FaqIcon} alt="Perguntas Frequentes" className="w-8 h-8 mr-1" />
            {!isCollapsed && <span className="text-lg">Perguntas frequentes</span>}
          </a>
          <a
            href="previous-calls"
            className={`flex items-center space-x-2 hover:text-blue-500 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <img src={PreviousCallsIcon} alt="Chamados Anteriores" className="w-8 h-8 mr-1" />
            {!isCollapsed && <span className="text-lg">Chamados anteriores</span>}
          </a>
          <a
            href="about"
            className={`flex items-center space-x-2 hover:text-blue-500 ${isCollapsed ? 'justify-center' : ''}`}
          >
            <img src={AboutIcon} alt="Sobre o Projeto" className="w-8 h-8 mr-1" />
            {!isCollapsed && <span className="text-lg">Sobre o Projeto</span>}
          </a>
        </nav>
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-[8.25rem] ${isCollapsed ? 'right-[-1rem] duration-300' : 'right-[-14.35rem] lg:right-[-1.35rem] duration-300'} bg-[#2A2A2A] p-1.5 rounded-full focus:outline-none`}
      >
        <img
          src={isCollapsed ? SetaDireita : SetaEsquerda}
          alt="Toggle"
          className="w-6 h-6 text-[#000000]"
        />
      </button>
    </div>
  );
};

export default Sidebar;
