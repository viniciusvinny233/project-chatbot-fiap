import React, { useState } from 'react';
import SetaBaixo from '../assets/images/arrow_down.png';

const Faq: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Remoção de acesso",
      answer: `Esta instrução de trabalho descreve a execução das atividades de remoção de acesso dos colaboradores na ferramenta SISTEMA Y.`
    },
    {
      question: "Atualizar dados da BU",
      answer: `Quando um colaborador DA EMPRESA X entrar em contato comunicado que agora seu e-mail deixará de ser DA EMPRESA X e se tornará DA EMPRESA X ou DA EMPRESA X(por exemplo). O analista N1 deve realizar as orientações descritas nessa IT.`
    },
    {
      question: "Atualizar dados da BU",
      answer: `Quando um colaborador DA EMPRESA X entrar em contato comunicado que agora seu e-mail deixará de ser DA EMPRESA X e se tornará DA EMPRESA X ou DA EMPRESA X(por exemplo). O analista N1 deve realizar as orientações descritas nessa IT.`
    },
    {
      question: "Desbloqueio de Usuário",
      answer: `Esta instrução de trabalho tem como objetivo orientar os analistas no processo de desbloqueio de usuário no sistema SAP e Portal SAP.`
    },
    {
      question: "Reset de Senha",
      answer: `Esta instrução de trabalho tem como objetivo orientar os analistas no processo de alteração de senha do usuário nos sistemas SAP e Portal SAP.`
    },
    {
      question: "Alteração de Acessos",
      answer: `Esta Instrução de Trabalho visa orientar na atividade de alteração de acesso do usuário no sistema SISTEMA Y.`
    },
    {
      question: "Alterar Perfil de Acesso ",
      answer: `Esta instrução de trabalho orienta o passo a passo para atribuição de grupos de acesso ao SISTEMA Y, para a atribuição do mesmo é necessário que os seguintes questionamentos tenham sido respondidos via chamado. Com autorização gerencial em anexo.
`
    },
    {
      question: "Manutenção de Perfil no SISTEMA Y",
      answer: `Este documento estabelece o procedimento para os analistas de Acesso criar, alterar e/ou modificar Perfil e Funções no SISTEMA Y (SISTEMA Y e Pagamento aos Distribuidores e Redes) que podem ser acessados através do endereço do ambiente de produção https://xxxxxxxxxxxxxxxx`
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 bg-custom-gradient">
      <div className="w-full max-w-7xl">
        <div className='justify-center md:flex-row md:justify-between items-center'>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text mt-2 md:text-center text-center md:mt-3">CHAMADOS FREQUENTES</h1>
          <p className="mt-4 text-gray-400 w-full  text-center">
            Caso sua dúvida não esteja aqui é só chamar nosso chatbot, Catty.
          </p>
          <div className="flex items-center justify-center  mb-12 relative">
            <input 
            type="text" 
            placeholder="Buscar um chamado ou assunto"
            className="mt-4 p-3 bg-[#222222] rounded-md md:w-80 border min-w-64 border-[#363636] focus:outline-none focus:bg-[#1a1a1a] "/>
          </div>
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
                    <div className="flex flex-col space-x-4 md:flex-row leading-[1rem] md:leading-5">
                      <button className="bg-[#f85591] hover:bg-pink-700 text-black font-bold py-2 px-4 rounded-xl ml-4 md:ml-0">
                        SIM
                      </button>
                      <a href='previous-calls'>
                        <button className="bg-[#f85591] hover:bg-pink-700 text-black font-bold py-2 px-4 rounded-xl mt-4 md:mt-0">
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
