import React from 'react';

import BotIcon from '../assets/images/1.png';
import FiapIcon from '../assets/images/3.png';
import LogoRosaIcon from '../assets/images/logo-rosa.png';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen md:h-max items-center justify-between text-center px-4 md:px-8 lg:px-16 bg-custom-gradient">
      <div className="flex flex-col items-center mb-12">
        <div className="flex flex-col md:flex-row items-center mb-12 mt-3 justify-center">
          <img src={FiapIcon} alt="Icon" className="w-[8em] h-auto md:w-[10em] md:h-[1.25em] mr-0 md:mr-4 mb-4 md:mb-0" />
          <img src={LogoRosaIcon} alt="Icon" className="w-[2.1em] h-[2.15em]" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-inter text-customBlue mb-3 leading-tight">
          Bem vindo! <b>como posso ajudar você?</b>
        </h1>
        <p className="text-customText font-inter max-w-2xl md:max-w-3xl lg:max-w-5xl px-4 md:px-0 leading-relaxed">
        Seu assistente técnico inteligente desenvolvido para oferecer suporte de forma amigável e eficiente. Combinamos tecnologia de ponta com uma experiência acolhedora. 
        Conheça nossa gatinha assistente, Catty, e descubra como podemos facilitar seu trabalho.
        </p>
        <div className="mt-5 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <a href="about">
          <button className="w-[9.5rem] h-[3.75rem] bg-transparent border border-gradient text-[#D7E5E6] rounded-[0.9rem] hover:text-gray-400">
            SOBRE O <br /> PROJETO
          </button>
          </a>
          <a href="chatbot">
          <button className="w-[9.5rem] h-[3.75rem] bg-[#E27696] hover:bg-pink-600 text-black rounded-[0.9rem] font-semibold">
            CHATBOT
          </button>
          </a>
        </div>
      </div>
      <div className="flex justify-center mt-[-2rem] md:mt-[9.1rem] lg:mt-[4.1rem]">
        <img src={BotIcon} alt="Icon" className="w-60 md:w-[30em] lg:w-[38em] h-auto" />
      </div>
    </div>
  );
};

export default Home;
