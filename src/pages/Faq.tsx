import React, { useState } from 'react';
import SetaBaixo from '../assets/images/arrow_down.png';

const Faq: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
    {
      question: "Imperdiet massa tincidunt nunc pulvinar?",
      answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vulputate ut pharetra sit
      amet aliquam id diam. Enim neque volutpat ac tincidunt vitae...`
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13">
      <div className="w-full max-w-7xl">
        <div className='flex flex-col justify-center md:flex-row md:justify-between items-center'>
          <p className="mt-4 text-gray-400 w-full md:max-w-56 md:text-start text-center">
            Caso sua dúvida não esteja aqui é só chamar nosso chatbot, Catty.
          </p>
          <h1 className="text-4xl font-bold text-[#77C1C6] mt-2 md:text-center text-center md:mt-3">PERGUNTAS <br />FREQUENTES</h1>
        </div>

        <div className="mt-8 max-h-[36rem] md:max-h-[42rem] overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-[#77C1C6] scrollbar-track-[#2a2a2a] pr-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-[#2a2a2a] rounded-xl shadow-md cursor-pointer" onClick={() => toggleExpand(index)}>
              <h3 className="text-xl font-bold mb-2 flex justify-between">
                {faq.question}
                <span className={`transform transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}>
                  <img src={SetaBaixo} alt="Expandir" className="w-5 h-5" />
                </span>
              </h3>
              {expandedIndex === index && (
                <div>
                  <p className="text-gray-300 mb-4">{faq.answer}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-white font-bold">Essa resposta te ajudou?</p>
                    <div className="flex space-x-4">
                      <button className="bg-[#f85591] hover:bg-pink-700 text-black font-bold py-2 px-4 rounded-xl">
                        SIM
                      </button>
                      <a href='previous-calls'>
                        <button className="bg-[#f85591] hover:bg-pink-700 text-black font-bold py-2 px-4 rounded-xl">
                          AINDA PRECISO DE AJUDA
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='flex flex-row justify-center'>
          <p className="mt-1 text-gray-400 ">
            Role para baixo
          </p>
          <img src={SetaBaixo} alt="Perguntas Frequentes" className="w-5 h-5 mt-[0.35rem] ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Faq;
