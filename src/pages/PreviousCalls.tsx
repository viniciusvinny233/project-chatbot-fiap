import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarChamados from '../assets/images/avatar.png';
import FileSaver from '../assets/images/filesaver.png';
import LupaIcon from '../assets/images/lupa-faq.png';

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
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para o modal
  const [newCallSubject, setNewCallSubject] = useState('');
  const navigate = useNavigate();
  const baseUrl = "https://softtek-api-5e04b4d63dfd.herokuapp.com/api/tickets";
  const pageSize = 5;
  const [sortConfig, setSortConfig] = useState<{ key: keyof Ticket; direction: 'ascending' | 'descending' }>({
    key: 'numeroTicket',
    direction: 'ascending',
  });

  // Função para lidar com a ordenação
  const handleSort = (key: keyof Ticket) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const closeModalAndAddFakeCall = () => {
    const fakeCall: Ticket = {
      idTicket: 'X',
      numeroTicket: 'INC01234567',
      descricaoTicket: newCallSubject,
      descricaoEstadoTicket: 'Em Andamento',
      dataAbertura: Math.floor(Date.now() / 1000),
      dataAtualizacao: null,
      dataRelatorioResolvido: null,
      dataEncerramento: null,
    };
  
    // Adiciona o chamado fictício ao estado
    setCalls((prevCalls) => [fakeCall, ...prevCalls]);

    // Fecha o modal
    setIsModalOpen(false);
    setNewCallSubject(''); // Limpa o campo de assunto após criar o chamado fictício
  };
  

  // Função para ordenar os dados
  const sortedCalls = [...calls].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue === undefined || bValue === undefined) return 0;

    if (aValue === null) return 1;
    if (bValue === null) return -1;

    if (sortConfig.direction === 'ascending') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const renderSortArrow = (key: keyof Ticket) => {
    if (sortConfig.key !== key) {
      return '▾';
    }
    return sortConfig.direction === 'ascending' ? '▴' : '▾';
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1028);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatUnixTimestampToDateTime = (unixTimestamp: number | null): string => {
    if (unixTimestamp === null) return 'N/A';

    const date = new Date(unixTimestamp * 1000);

    return date.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
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

  const filteredCalls = sortedCalls.filter(
    (call) =>
      call.numeroTicket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.descricaoTicket.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true);

  // Função para fechar o modal
  const closeModal = () => setIsModalOpen(false);
  return (
   <>
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 pb-0">
      <div className="w-full max-w-7xl">
        {!isMobile && (
          <><div className='flex flex-col justify-center md:flex-row items-center'>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text mt-2 md:text-center text-center md:mt-3">
              CHAMADOS
            </h1>
          </div><div className='flex flex-row gap-2 items-center justify-around pt-5 flex-wrap'>
              <div className='flex flex-row gap-2 items-center'>
                <img src={AvatarChamados} alt="Avatar" />
                <div className='text-sm'>
                  <p>Nome do Atendente</p>
                  <p>email@email.com</p>
                  <p>(xx) xxxx-xxxx</p>
                </div>
              </div>
              <div className='flex flex-row gap-2 items-center w-[20rem] h-[4.25rem] border-gradient-previous'>
                <div className='text-sm flex justify-around flex-row w-full flex-wrap'>
                  <div className='text-xs'>
                    <p>TICKETS RESOLVIDOS</p>
                    <p className='text-3xl font-extrabold'>10</p>
                  </div>
                  <div className='text-xs'>
                    <p>TICKETS EM ANDAMENTO</p>
                    <p className='text-3xl font-extrabold'>1</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center relative">
                <div className='flex items-center justify-center flex-row'>

                  <img src={LupaIcon} alt="Search" className=" relative left-[0.5rem] sm:left-[3rem] w-8 h-8 " />
                  <input
                    type="text"
                    placeholder="Buscar um ID ou assunto"

                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 pl-[2.7rem] sm:pl-[3.5rem] h-[4.25rem] bg-[#222222] rounded-xl md:w-[36rem] border min-w-64 border-[#363636] focus:outline-none focus:bg-[#1a1a1a]" />
                </div>
              </div>
              <div className='flex'>
                  <button onClick={openModal}>
                  <img src={FileSaver} alt="Icon" className="w-9 h-9" /></button>
                </div>
            </div></>
        )}
         {/* Modal */}
         {isModalOpen && (
            <div className="fixed inset-0 bg-zinc-950/70 flex items-center justify-center z-10 font-inter">
              <div className="md:w-[640px] rounded-xl py-5 px-6 bg-[#252525]">
                <div className="space-y-3 mb-5">
                  <div className="font-semibold text-lg px-1 flex items-center justify-between">
                    Abrir um novo chamado
                    <button onClick={closeModal}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                  <div id="Separador" className="w-full h-px bg-zinc-700" />
                </div>
                <div className="flex flex-col space-y-2">
                <div className="w-full px-4 py-4 rounded-md bg-[#1b1b1b] flex space-x-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-round text-zinc-300"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
              <input type="text" className="w-full bg-transparent outline-none" placeholder="Responsável"></input>
            </div>
                    <div className="w-full px-4 py-4 rounded-md bg-[#1b1b1b] flex space-x-2 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-circle-more text-zinc-300"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
                      <input
                            type="text"
                            className="w-full bg-transparent outline-none"
                            placeholder="Assunto"
                            value={newCallSubject} // Adicione o valor do estado
                            onChange={(e) => setNewCallSubject(e.target.value)} // Atualize o estado ao digitar
                          />
                  </div>
                </div>
<button
  className="px-3 py-2 w-full bg-[#77C1C6] mt-4 rounded-md text-[#252525] font-semibold"
  onClick={closeModalAndAddFakeCall}
>
  Confirmar criação do chamado
</button>
              </div>
            </div>
          )}
        {isMobile && (
          <><div className='flex flex-col justify-center md:flex-row items-center'>
            <div className='flex flex-row w-[90%] md:w-[70%] justify-center mt-2 md:mt-3'>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text md:text-center text-center ">
                CHAMADOS
              </h1>
            </div>

          </div>
            <div className="flex items-center justify-center relative mb-4">
              <div className='flex items-center justify-center flex-row '>
                <div className='relative'>
                  <img src={LupaIcon} alt="Search" className=" relative left-[0.5rem] sm:left-[1rem] w-8 h-8 top-[3.1rem] " />
                  <input
                    type="text"
                    placeholder="Buscar um ID ou assunto"

                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-3 pl-[2.7rem] sm:pl-[3.5rem] flex justify-center h-[4.25rem] w-[21rem] bg-[#222222] rounded-xl md:w-[36rem] border min-w-[100%] border-[#363636] focus:outline-none focus:bg-[#1a1a1a]" />
                </div>
              </div>
            </div>
            <div className='flex flex-row gap-2 items-center justify-around   flex-wrap'>
              <div className='flex flex-row gap-2 items-center pb-8 pt-5'>
                <img src={AvatarChamados} alt="Avatar" />
                <div className='text-sm'>
                  <p className='font-bold'>Nome do Atendente</p>
                  <p>email@email.com</p>
                  <p>(xx) xxxx-xxxx</p>
                </div>
              </div>
              <div className='flex flex-row gap-2 items-center w-[100%] h-[4.25rem] border-gradient-previous'>
                <div className='text-sm flex justify-around flex-row w-full flex-wrap'>
                  <div className='text-xs'>
                    <p>TICKETS RESOLVIDOS</p>
                    <p className='text-3xl font-extrabold'>10</p>
                  </div>
                  <div className='text-xs'>
                    <p>TICKETS EM ANDAMENTO</p>
                    <p className='text-3xl font-extrabold'>1</p>
                  </div>
                </div>
              </div>


            </div></>
        )}

        {!isMobile && (
          <div className="scrollbar relative p-0  border-gradient-previous-table h-[42.2rem] mt-8 left-0 right-0 rounded-md bg-[#2a2a2a] overflow-y-auto ">
            <div className='px-4 py-2 pb-2 '>
              {isLoading ? (
                <div role="status" className='w-full h-full flex justify-center items-center mt-[16rem]' >
                  <svg aria-hidden="true" className="w-16 h-w-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : error ? (
                <p className="">Erro: {error}</p>
              ) : (
                <table className="min-w-full text-sm text-left text-gray-300 table-fixed font-inter">
                  <thead className="text-base uppercase border-b text-gray-300">
                    <tr>
                      <th scope="col" className="px-2 py-2 cursor-pointer w-[8%]" onClick={() => handleSort('numeroTicket')}>
                        ID {renderSortArrow('numeroTicket')}
                      </th>
                      <th scope="col" className="px-2 py-2 cursor-pointer w-[10%]" onClick={() => handleSort('dataAbertura')}>
                        Abertura {renderSortArrow('dataAbertura')}
                      </th>
                      <th scope="col" className="px-2 py-2 cursor-pointer w-[25%]" onClick={() => handleSort('descricaoTicket')}>
                        Assunto {renderSortArrow('descricaoTicket')}
                      </th>
                      <th scope="col" className="px-2 py-2 cursor-pointer w-[11%]" onClick={() => handleSort('dataAtualizacao')}>
                        Atualização {renderSortArrow('dataAtualizacao')}
                      </th>
                      <th scope="col" className="px-2 py-2 cursor-pointer w-[10%]" onClick={() => handleSort('dataRelatorioResolvido')}>
                        Resolução {renderSortArrow('dataRelatorioResolvido')}
                      </th>
                      <th scope="col" className="px-2 py-2 cursor-pointer w-[12%]" onClick={() => handleSort('dataEncerramento')}>
                        Encerramento {renderSortArrow('dataEncerramento')}
                      </th>
                      <th scope="col" className="px-2 py-2 cursor-pointer w-[10%] text-center" onClick={() => handleSort('descricaoEstadoTicket')}>
                        Status {renderSortArrow('descricaoEstadoTicket')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCalls.length > 0 ? (
                      filteredCalls.map((call, index) => (
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
                          <td className="px-2 py-2 pl-5 break-words ">{formatUnixTimestampToDateTime(call.dataEncerramento)}</td>
                          <td className="px-2 py-2 text-center ">
                            <span
                              className={`inline-block py-1 px-3 rounded-lg font-bold w-full text-center ${call.descricaoEstadoTicket === 'Resolvido'
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          Nenhum resultado encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <>
            <div className="scrollbar mb-5 relative h-[42.2rem] mt-8 left-0 right-0 border-gradient-previous-table bg-[#2a2a2a] overflow-y-auto  p-0">
              <div className='px-4 py-2 pb-2'>
                {isLoading ? (
                  <div role="status" className='w-full h-full flex justify-center items-center mt-36' >
                    <svg aria-hidden="true" className="w-16 h-w-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : error ? (
                  <p className="">Erro: {error}</p>
                ) : (
                  <table className="min-w-full text-sm text-left text-gray-300 table-fixed">
                    <tbody>
                      {filteredCalls.length > 0 ? (
                        filteredCalls.map((call, index) => (
                          <div
                            key={index}
                            onClick={() => handleRowClick(call.idTicket)}
                            className="border-b border-gray-700 hover:bg-zinc-700/40 cursor-pointer min-h-14"
                          >
                            <div className="flex flex-row">
                              <div className="px-2 py-2 font-bold text-lg">ID:</div>
                              <div className="px-2 py-2 break-words pt-[0.54rem] font-bold text-lg ">{call.numeroTicket || 'N/A'}</div>
                            </div>
                            <div className="flex flex-row">
                              <div className="px-2 py-2 text-base font-bold">Abertura:</div>
                              <div className="px-2 py-2 break-words pt-[0.54rem] ">{formatUnixTimestampToDateTime(call.dataAbertura)}</div>
                            </div>
                            <div className="flex flex-row">
                              <div className="px-2 py-2 text-base font-bold">Assunto:</div>
                              <div className="px-2 py-2 break-words pt-[0.54rem] ">{call.descricaoTicket || 'N/A'}</div>
                            </div>
                            <div className="flex flex-row">
                              <div className="px-2 py-2 text-base font-bold">Atualização:</div>
                              <div className="px-2 py-2 break-words pt-[0.54rem] ">{formatUnixTimestampToDateTime(call.dataAtualizacao)}</div>
                            </div>
                            <div className="flex flex-row">
                              <div className="px-2 py-2 text-base font-bold">Resolução:</div>
                              <div className="px-2 py-2 break-words pt-[0.54rem] ">{formatUnixTimestampToDateTime(call.dataRelatorioResolvido)}</div>
                            </div>
                            <div className="flex flex-row">
                              <div className="px-2 py-2 text-base font-bold">Encerramento:</div>
                              <div className="px-2 py-2 break-words pt-[0.54rem] ">{formatUnixTimestampToDateTime(call.dataEncerramento)}</div>
                            </div>
                            <div className="px-2 py-2 text-center mb-2">
                              <span
                                className={`inline-block py-1 px-3 rounded-lg font-bold w-full text-center ${call.descricaoEstadoTicket === 'Resolvido'
                                    ? 'text-xs uppercase bg-lime-800 text-lime-400'
                                    : call.descricaoEstadoTicket === 'Em Andamento'
                                      ? 'text-xs uppercase bg-yellow-800 text-yellow-200'
                                      : 'text-xs uppercase bg-zinc-700 text-zinc-400'
                                  }`}
                              >
                                {call.descricaoEstadoTicket || 'N/A'}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center py-4">
                            Nenhum resultado encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
    </>
  );
};

export default PreviousCalls;
