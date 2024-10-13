import React, { useEffect, useState } from 'react';
import AvatarChamados from '../assets/images/Avatar.png';

// Definir a interface dos tickets
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

  const baseUrl = "https://softtek-api-5e04b4d63dfd.herokuapp.com/api/tickets";
  const pageSize = 5; // Tamanho da página, ajustável conforme necessário

  // Função para converter timestamp Unix para data legível
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

  // Função para buscar dados de todas as páginas da API
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

        // Log para verificar a resposta da API e depurar
        console.log(`Página ${currentPage} de dados:`, data);

        // Verifica se ainda há conteúdo
        if (data.content && data.content.length > 0) {
          allTickets = allTickets.concat(data.content); // Adiciona os itens ao array
          currentPage++; // Próxima página
        } else {
          hasMorePages = false; // Se não houver mais conteúdo, interrompe o loop
        }
      }

      setCalls(allTickets); // Atualiza o estado com todos os tickets coletados
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPages();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 pb-0 md:pb-0">
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
              className="p-3 h-16 bg-[#222222] rounded-md md:w-80 border min-w-64 border-[#363636] focus:outline-none focus:bg-[#1a1a1a]"
            />
          </div>
        </div>

        <div className="scrollbar relative h-[47.2rem] mt-8 left-0 right-0 rounded-t-xl bg-[#2a2a2a] overflow-y-auto px-4 py-2 pb-2">
          {isLoading ? (
            <p>Carregando dados...</p>
          ) : error ? (
            <p className="text-red-500">Erro: {error}</p>
          ) : (
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="text-base uppercase border-b text-gray-300">
                <tr>
                  <th scope="col" className="px-2 py-2 w-[10%]">ID</th>
                  <th scope="col" className="px-2 py-2 w-[15%]">Abertura</th>
                  <th scope="col" className="px-2 py-2 w-[35%]">Assunto</th>
                  <th scope="col" className="px-2 py-2 w-[15%]">Atualização</th>
                  <th scope="col" className="px-2 py-2 w-[15%]">Resolução</th>
                  <th scope="col" className="px-2 py-2 w-[10%]">Encerramento</th>
                  <th scope="col" className="px-2 py-2 w-[10%] text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-2 py-2">{call.numeroTicket || 'N/A'}</td>
                    <td className="px-2 py-2">{formatUnixTimestampToDateTime(call.dataAbertura)}</td>
                    <td className="px-2 py-2">{call.descricaoTicket || 'N/A'}</td>
                    <td className="px-2 py-2">{formatUnixTimestampToDateTime(call.dataAtualizacao)}</td>
                    <td className="px-2 py-2">{formatUnixTimestampToDateTime(call.dataRelatorioResolvido)}</td>
                    <td className="px-2 py-2">{formatUnixTimestampToDateTime(call.dataEncerramento)}</td>
                    <td className="px-2 py-2 text-center">
                      <span
                        className={`inline-block py-1 px-3 rounded-xl font-bold text-white w-full text-center ${
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
