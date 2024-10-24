import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ChatbotIcon from '../assets/images/chatbot.png';
import LogoMenu from '../assets/images/logo-menu.png';
import FaqIcon from '../assets/images/perguntas-frequentes.png';
import PreviousCallsIcon from '../assets/images/chamados-anteriores.png';
import LupaIcon from '../assets/images/4.png';
import LogoShortIcon from '../assets/images/logo-short.png';
import ToolBar from '../assets/images/tool-bar.png';
import SetaEsquerda from '../assets/images/arrow_left.png';
import SetaDireita from '../assets/images/arrow_right.png';
import Avatar from '../assets/images/avatar.png';

const Topbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(!false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => {

    if (isOpen == true) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }

  };

  const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };

  // Dados das divs para filtrar
  const menuItems = [

    { to: "/chatbot", label: "Chatbot", icon: ChatbotIcon },
    { to: "/faq", label: "Chamados frequentes", icon: FaqIcon },
    { to: "/previous-calls", label: "Chamados anteriores", icon: PreviousCallsIcon },
  ];

  // Filtrar os itens do menu com base no termo de busca
  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1028) {
        //setIsOpen(true);
        setIsMobile(true);
      } else {
        //setIsOpen(false);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative z-50 w-full ">
      {/* Topbar */}
      <div className={`${!isMobile ? `w-20 h-screen border-gradient-right` : `w-full h-[4.5rem] bg-[#1a1a1a] border-gradient-bottom flex items-center justify-between px-6 shadow-lg`}`}>
        {isMobile && (
          <><button onClick={toggleMenu} className="">
            <img src={ToolBar} alt="Icon" className="w-9 h-9" />
          </button>
            <Link to="/">
              <img src={LogoShortIcon} alt="Icon" className="w-9 h-9" />
            </Link></>
        )}
        {!isMobile && (
          <>
            <button
              onClick={toggleMenu}
              className={`absolute right-[-2rem] top-[5rem] w-10 h-16 lg:right-[-2rem] duration-300 flex'} bg-[#2A2A2A] p-1.5 rounded-lg focus:outline-none `}
            >
              <img
                src={isOpen ? SetaDireita : SetaEsquerda}
                alt="Toggle"
                className={`w-6 h-6 text-[#000000] ${isOpen ? "w-10 h-6" : ""} `}
              />
            </button>
            <div className='flex flex-col items-center h-screen w-full justify-between'>
              <div className='flex flex-col h-[21rem] w-full items-center  justify-between mt-5'>
                <button className="mt-2">
                  <Link
                    to="/"
                    className=""
                  >
                    <img src={LogoMenu} alt="Icon" className="w-[3.45rem] h-[3.45rem]" />
                  </Link>
                </button>
                <div onClick={toggleMenu} className='p-3 bg-[#769197] rounded-full my-4 mt-4 hover:cursor-pointer'>
                  <img src={LupaIcon} alt="Icon" className="w-7 h-7 " />
                </div>
                <Link
                  to="/chatbot"
                  className=""
                >
                  <img src={ChatbotIcon} alt="Icon" className="w-7 h-7" />
                </Link>
                <Link
                  to="/previous-calls"
                  className=""
                >
                  <img src={PreviousCallsIcon} alt="Icon" className="w-7 h-7 " />
                </Link>
                <Link
                  to="/faq"
                  className=""
                >
                  <img src={FaqIcon} alt="Icon" className="w-7 h-7" />
                </Link>
              </div>
              <img src={Avatar} alt="Icon" className="w-14 h-14 mb-5" />
            </div>
          </>
        )}
      </div>

      {/* Menu lateral */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 transition-all duration-300 ease-in-out  ${!isOpen ? 'block ' : 'hidden'
          }`}
        onClick={toggleMenu} />

      <div
        className={`fixed top-0 left-0 h-full border-gradient-right w-[18rem] bg-[#2A2A2A] text-white transition-transform transform   ${!isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>

        <div className={`h-screen flex flex-col justify-between ${isOpen ? 'hidden' : 'relative p-5 z-50 w-72'}`}>
          <div className="">
          <div className="flex items-center mb-10 justify-between ">
            <img src={LogoMenu} alt="Icon" className={`min-w-14 h-14 mt-2 ${isOpen ? 'mt-5 min-w-[0rem] h-[0rem]' : ''}`} />
            {!isOpen && (
              <span className="text-[2.5rem] font-extrabold text-[#92DCE1] font-montserrat">CATECH</span>
            )}
          </div>
          <div className={`flex w-full items-center mb-9 relative ${isOpen ? 'justify-center' : ''}`}>
            {!isOpen && (
              <>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-3 py-3 pl-5 pr-11 rounded-full bg-[rgba(191,243,255,0.5)] text-gray-800 focus:outline-none hover:bg-[#92DCE1] focus:bg-[#92DCE1]"
                />
                <img src={LupaIcon} alt="Search" className="absolute right-4 w-5 h-5" />
              </>
            )}
          </div>
          <nav className={`flex flex-col space-y-3 text-[#BFF3FF] text-base`}>
            {filteredItems.map((item, index) => (
              <div key={index} className='hover:bg-gradient-to-r from-[#2c2d2d00] via-[#77c1c640] to-[#e2769660] rounded-md p-[0.65rem]'>
                <Link
                  onClick={toggleMenu}
                  to={item.to}
                  className={`flex items-center space-x-2 hover:background-hover-topbar ${isOpen ? 'justify-center' : ''}`}
                >
                  <img src={item.icon} alt={item.label} className="w-7 h-7 mr-1 mx-[-0.8rem] my-[-1rem]" />
                  {!isOpen && <span className="text-[1.1rem]">{item.label}</span>}
                </Link>
                
              </div>

            ))}
            
          </nav>
          </div>
          <div className="flex space-x-3">
          <img src={Avatar} alt="Icon" className="w-14 h-14 " />
          <div className="text-xs leading-4 font-inter flex flex-col justify-center">
            <p className="text-sm font-medium">Nome do atendente</p>
            <p>email@email.com</p>
            <p>(xx) xxxxx-xxxx</p>
            </div>
          </div>
        </div>

        {!isOpen && (
          <button
            onClick={toggleMenu}
            className={`absolute right-[-2rem] top-[5rem] w-10 h-16 lg:right-[-2rem] duration-300 flex'} bg-[#2A2A2A] p-1.5 rounded-lg focus:outline-none `}
          >
            <img
              src={isOpen ? SetaDireita : SetaEsquerda}
              alt="Toggle"
              className={`w-6 h-6 text-[#000000] ${isOpen ? "w-10 h-6" : ""} `}
            />
          </button>)}
      </div>
    </div>
  );
};

export default Topbar;
