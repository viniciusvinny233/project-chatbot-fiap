import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarChamados from '../assets/images/Avatar.png';

interface Ticket {
  idTicket: string;
  numeroTicket: string;
  descricaoTicket: string;
  descricaoEstadoTicket: string;
  dataAbertura: number;
  dataAtualizacao: number | null;
  dataRelatorioResolvido: number | null;
  dataEncerramento: number | null;
}

const PreviousCalls: React.FC = () => {
  const [calls, setCalls] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const baseUrl = "https://softtek-api-5e04b4d63dfd.herokuapp.com/api/tickets";
  const pageSize = 5;

  const formatUnixTimestampToDateTime = (unixTimestamp: number | null): string => {
    if (unixTimestamp === null) return 'N/A';
    const date = new Date(unixTimestamp);
    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const fetchAllPages = async () => {
    let currentPage = 1;
    let allTickets: Ticket[] = [];
    let hasMorePages = true;

    try {
      while (hasMorePages) {
        const response = await fetch(`${baseUrl}?page=${currentPage}&size=${pageSize}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar dados da API: ${response.status}`);
        }

        const data = await response.json();

        if (data.content && data.content.length > 0) {
          allTickets = allTickets.concat(data.content);
          currentPage++;
        } else {
          hasMorePages = false;
        }
      }

      setCalls(allTickets);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

  const handleRowClick = (idTicket: string) => {
    navigate(`/ticket/${idTicket}`);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 pb-0">
      <div className="w-full max-w-7xl">
        <div className='flex flex-col justify-center md:flex-row items-center'>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text mt-2 md:text-center text-center md:mt-3">
            CHAMADOS
          </h1>
        </div>

        <div className='flex flex-row gap-2 items-center justify-between'>
          <div className='flex flex-row gap-2 items-center'>
            <img src={AvatarChamados} alt="Avatar" />
            <div className='text-sm'>
              <p>Nome do Atendente</p>
              <p>email@email.com</p>
              <p>(xx) xxxx-xxxx</p>
            </div>
          </div>

          <div className="flex items-center justify-center relative">
            <input
              type="text"
              placeholder="Buscar um chamado ou assunto"
              className="p-3 px-5 h-16 bg-[#222222] rounded-md md:w-80 border min-w-64 border-[#363636] focus:outline-none focus:bg-[#1a1a1a]"
            />
          </div>
        </div>

        <div className="scrollbar relative h-[47.2rem] mt-8 left-0 right-0 rounded-t-xl bg-[#2a2a2a] overflow-y-auto px-4 py-2 pb-2">
          {isLoading ? (
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : error ? (
            <p className="text-red-500">Erro: {error}</p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-300 table-fixed">
              <thead className="text-base uppercase border-b text-gray-300">
                <tr>
                  <th scope="col" className="px-2 py-2 w-[10%]">ID</th>
                  <th scope="col" className="px-2 py-2 w-[20%]">Abertura</th>
                  <th scope="col" className="px-2 py-2 w-[25%]">Assunto</th>
                  <th scope="col" className="px-2 py-2 w-[15%]">Atualização</th>
                  <th scope="col" className="px-2 py-2 w-[15%]">Resolução</th>
                  <th scope="col" className="px-2 py-2 w-[15%]">Encerramento</th>
                  <th scope="col" className="px-2 py-2 w-[10%] text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(call.idTicket)}
                    className="border-b border-gray-700 hover:bg-zinc-700/40 cursor-pointer min-h-14"
                  >
                    <td className="px-2 py-2 break-words ">{call.numeroTicket || 'N/A'}</td>
                    <td className="px-2 py-2 break-words ">{formatUnixTimestampToDateTime(call.dataAbertura)}</td>
                    <td className="px-2 py-2 break-words ">{call.descricaoTicket || 'N/A'}</td>
                    <td className="px-2 py-2 break-words ">{formatUnixTimestampToDateTime(call.dataAtualizacao)}</td>
                    <td className="px-2 py-2 break-words ">{formatUnixTimestampToDateTime(call.dataRelatorioResolvido)}</td>
                    <td className="px-2 py-2 break-words ">{formatUnixTimestampToDateTime(call.dataEncerramento)}</td>
                    <td className="px-2 py-2 text-center ">
                      <span
                        className={`inline-block py-1 px-3 rounded-xl font-bold w-full text-center ${
                          call.descricaoEstadoTicket === 'Resolvido'
                            ? 'text-xs uppercase bg-lime-800 text-lime-400'
                            : call.descricaoEstadoTicket === 'Em Andamento'
                            ? 'text-xs  uppercase bg-yellow-800 text-yellow-200'
                            : 'text-xs  uppercase bg-zinc-700 text-zinc-400'
                        }`}
                      >
                        {call.descricaoEstadoTicket || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviousCalls;
