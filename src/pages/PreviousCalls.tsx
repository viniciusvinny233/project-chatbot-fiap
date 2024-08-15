import React from 'react';

const PreviousCalls: React.FC = () => {
  const calls = [
    {
      date: "19/05/2023 16:00",
      subject: "Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae semper quis lectus. In ante metus dictum at tempor.",
      status: "EM ANDAMENTO",
      statusColor: "bg-yellow-500"
    },
    {
      date: "19/05/2023 16:00",
      subject: "Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae semper quis lectus. In ante metus dictum at tempor.",
      status: "FINALIZADO",
      statusColor: "bg-green-500"
    },
    {
      date: "19/05/2023 16:00",
      subject: "Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae semper quis lectus. In ante metus dictum at tempor.",
      status: "ERRO",
      statusColor: "bg-red-500"
    },
    {
      date: "19/05/2023 16:00",
      subject: "Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae semper quis lectus. In ante metus dictum at tempor.",
      status: "FINALIZADO",
      statusColor: "bg-green-500"
    },
    {
      date: "19/05/2023 16:00",
      subject: "Diam vulputate ut pharetra sit amet aliquam id diam. Enim neque volutpat ac tincidunt vitae semper quis lectus. In ante metus dictum at tempor.",
      status: "FINALIZADO",
      statusColor: "bg-green-500"
    },

  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 pb-0 md:pb-0">
      <div className="w-full max-w-7xl">
        <div className='flex flex-col justify-center md:flex-row md:justify-between items-center'>
          <p className="mt-4 text-gray-400 w-full md:max-w-56 md:text-start text-center text-sm md:text-base lg:text-lg">
            Caso sua dúvida não esteja aqui é só chamar nosso chatbot, Catty.
          </p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#77C1C6] mt-2 text-center">
            CHAMADOS <br />ANTERIORES
          </h1>
        </div>

        <div className="relative h-[46.2rem] mt-8 bottom-0 left-0 right-0 rounded-t-xl bg-[#2a2a2a] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-xl scrollbar-thumb-[#77C1C6] scrollbar-track-[#2a2a2a] p-4 pb-0 ">
          <div className="flex flex-col text-gray-300 text-sm md:text-base lg:text-lg">
            <div className="flex py-2 px-4 font-semibold text-gray-400">
              <div className="w-1/3 md:w-[12%] mr-2">DATA</div>
              <div className="w-1/2 md:w-[68%] mx-2">ASSUNTO</div>
              <div className="w-1/3 md:w-[20%] ml-2 text-right md:text-left">STATUS</div>
            </div>
            <div className="flex flex-col">
              {calls.map((call, index) => (
                <div key={index} className="flex flex-col md:flex-row border-t-2 border-gray-600 py-4 px-2 md:px-4">
                  <div className="w-full md:w-[12%] mr-2 ml-2 md:ml-0">{call.date}</div>
                  <div className="w-full md:w-[68%] mx-2">{call.subject}</div>
                  <div className="w-full md:w-[20%] ml-2 mt-2 md:mt-0 text-right md:text-left">
                    <span className={`inline-block py-1 px-3 rounded-xl font-bold text-white w-full md:w-44 text-center ${call.statusColor}`}>
                      {call.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PreviousCalls;