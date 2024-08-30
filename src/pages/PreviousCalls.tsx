import React from 'react';

const PreviousCalls: React.FC = () => {
  const calls = [
        {
      id: "XXXXXXXXX",
      date: "XX/XX/XX XX:XX:XX",
      subject: "Criar usuário de rede",
      status: "EM ANDAMENTO",
      statusColor: "bg-yellow-600",
      statusTextColor: "text-yellow-300",
      lastAtt: "XX/XX/XX XX:XX:XX",
      resolutionDate: "XX/XX/XX XX:XX:XX",
      finalDate: "XX/XX/XX XX:XX:XX",
    },
    {
      id: "INC0194887",
      date: "09/02/24 17:15:47",
      subject: "Lentidão sistema",
      status: "RESOLVIDO",
      statusColor: "bg-lime-700",
      statusTextColor: "text-lime-300",
      lastAtt: "03/05/24 11:34:26",
      resolutionDate: "02/05/24 21:00:00",
      finalDate: "01/05/24 15:00:04",
    },
    {
      id: "INC0201867",
      date: "22/03/24 05:08:10",
      subject: "Lentidão sistema",
      status: "RESOLVIDO",
      statusColor: "bg-lime-700",
      statusTextColor: "text-lime-300",
      lastAtt: "02/05/24 11:40:15",
      resolutionDate: "01/05/24 21:00:00",
      finalDate: "01/05/24 15:00:04",
    },
    {
      id: "TASK0900023",
      date: "19/02/24 05:16:45",
      subject: "Incluir perfil espelho",
      status: "FECHADO",
      statusColor: "bg-zinc-600",
      statusTextColor: "text-zinc-300",
      lastAtt: "XX/XX/XX XX:XX:XX",
      resolutionDate: "XX/XX/XX XX:XX:XX",
      finalDate: "XX/XX/XX XX:XX:XX",
    },
    {
      id: "TASK0912173",
      date: "05/03/24 13:55:51",
      subject: "Impressora Não Imprime",
      status: "EM ANDAMENTO",
      statusColor: "bg-yellow-600",
      statusTextColor: "text-yellow-300",
      lastAtt: "03/05/24 13:17:38",
      resolutionDate: "02/05/24 21:00:00",
      finalDate: "03/05/24 13:17:38",
    },

  ];

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 pb-0 md:pb-0">
      <div className="w-full max-w-7xl">
        <div className='flex flex-col justify-center md:flex-row items-center'>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text mt-2 md:text-center text-center md:mt-3">
            CHAMADOS
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
                    <span className={`inline-block py-1 px-3 rounded-xl font-bold text-white w-full md:w-44 text-center ${call.statusColor} ${call.statusTextColor}`}>
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
