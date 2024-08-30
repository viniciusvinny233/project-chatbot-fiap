import React from 'react';

import MarcosVinicius from '../assets/images/marcos-vinicius.jpg';
import Ana from '../assets/images/ana.png';
import Vitor from '../assets/images/vitor.jfif';
import SetaDireita from '../assets/images/seta-direta-about.png';
import Linkedin from '../assets/images/linkedIn.png';
import Matheus from '../assets/images/matheus.jpeg';
import Dionisio from '../assets/images/dionisio.jpeg';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-5 sm:p-8 xl:p-16">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-2 xl:gap-6 2xl:gap-10 2xl:grid-cols-3 2md:grid-cols-2">

        <div className="bg-[#2a2a2a] rounded-3xl border-gradient-about h-80 relative">
          <img src={Ana} alt="Ana Vitória Baetas" className="w-full h-44 rounded-[1.8rem] object-cover p-4" />
          <div className="absolute top-[7.5rem] right-6">
            <a href="https://www.linkedin.com/in/anavitoriabaetas/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>
          <div className="px-4">
            <h2 className="text-2xl font-bold text-[#C5E2E4] leading-[0.1] pt-3 xs:text-4xl xs:leading-[0.3]">DESIGN UX/UI</h2>
            <h2 className="text-2xl font-bold text-[#C5E2E4] leading-[0] pt-6 xs:text-4xl xs:leading-[0]">DOCUMENTAÇÃO</h2>
            <p className="mt-4 text-gray-300">ANA VITÓRIA BAETAS DA SILVA</p>
            <p className=" text-gray-300 leading-[0.5]">RM 99006</p>
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-3xl border-gradient-about h-80 relative">
          <img src={MarcosVinicius} alt="Marcos Vinicius Pinheiro" className="w-full h-44 rounded-[1.8rem] object-cover p-4" />
          <div className="absolute top-[7.5rem] right-6">
            <a href="https://www.linkedin.com/in/vnxdeveloper/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>
          <div className="px-4">
            <p className="text-3xl font-bold leading-[0] text-[#C5E2E4] pt-3 xs:text-6xl xs:leading-[0.5]">FRONTEND</p>
            <p className="mt-4 text-gray-300 pt-2 leading-[1.5]">MARCOS VINICIUS PINHEIRO RODRIGUES</p>
            <p className="text-gray-300 leading-[0.5]">RM 99894</p>
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-3xl border-gradient-about h-80 relative">
          <img src={Matheus} alt="Matheus Guedes Bertaioilli" className="w-full h-44 rounded-[1.8rem] object-cover p-4" />
          <div className="absolute top-[7.5rem] right-6">
            <a href="https://www.linkedin.com/in/matheusbertaiolli/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>
          <div className="px-4">
            <h2 className="text-3xl font-bold text-[#C5E2E4] leading-[0.5] pt-3 xs:text-6xl xs:leading-[0.5]">BACKEND</h2>
            <p className="mt-4 text-gray-300 leading-[0.5] pt-4">MATHEUS GUEDES BERTAIOLLI</p>
            <p className=" text-gray-300">RM 551223</p>
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-3xl border-gradient-about h-80 relative">
          <img src={Vitor} alt="Vitor Futida Sternik" className="w-full h-44 rounded-[1.8rem] object-cover p-4" />
          <div className="absolute top-[7.5rem] right-6">
            <a href="https://www.linkedin.com/in/vitor-sternik-7170b5228/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>
          <div className="px-4">
            <h2 className="text-6xl font-bold text-[#C5E2E4] leading-[0.5] pt-3">PITCH I</h2>
            <p className="mt-4 text-gray-300 leading-[0.5] pt-4">VITOR FUTIDA STERNIK</p>
            <p className=" text-gray-300">RM 98697</p>
          </div>
        </div>

        <div className="bg-[#2a2a2a] rounded-3xl border-gradient-about h-80 relative">
          <img src={Dionisio} alt="Dionisio Sant'Ana Pereira" className="w-full h-44 rounded-[1.8rem] object-cover p-4" />
          <div className="absolute top-[7.5rem] right-6">
            <a href="https://www.linkedin.com/in/dionisio-santana-pereira/" target="_blank" rel="noopener noreferrer">
              <img src={Linkedin} alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>
          <div className="px-4">
            <h2 className="text-3xl font-bold text-[#C5E2E4] leading-[0.5] pt-3 xs:text-6xl xs:leading-[0.5]">PITCH II</h2>
            <p className="mt-4 text-gray-300 leading-[0.5] pt-4">DIONISIO SANT'ANA PEREIRA</p>
            <p className=" text-gray-300">RM 97985</p>
          </div>
        </div>


        <div className="rounded-3xl border-gradient-about-project h-80 relative bg-[#FF669D] flex flex-col justify-between">
          <div className='py-3 px-3 xs:px-7 xs:py-5'>
            <h2 className="text-[2rem] font-bold text-[#1E1E1E] leading-[1] tracking-tighter">CONHEÇA MAIS SOBRE O NOSSO PROJETO</h2>
            <p className="mt-4 text-[#1E1E1E] text-lg leading-[1.2] tracking-tight">
              ASSISTA NOSSOS PITCHS ENTREGUES E VEJA O PDF COM TODAS AS ETAPAS DE CRIAÇÃO DA CATECH
            </p>
          </div>
          <div className="flex justify-center">
            <a href="https://drive.google.com/file/d/16EFh6DlUEKhbncXS_qePD6NtpaH1wMfg/view?usp=sharing" target="_blank" className="flex items-center justify-between w-full h-[3rem] mb-5 mx-2 xl:mx-5 bg-[#1E1E1E] text-white rounded-full">
              <span className=" p-2 rounded-full ml-3">

              </span>
              <span className="font-bold text-lg  text-[#EBEBEB] xs:text-2xl">SOBRE O PROJETO</span>
              <span className="bg-gradient-to-r from-[#77C1C6] to-[#E27696] p-2 rounded-full mr-3">
                <img src={SetaDireita} alt="" className="w-5 h-5" />
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
