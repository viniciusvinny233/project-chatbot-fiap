import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar1 from '../assets/images/avatar1.png';
import Avatar2 from '../assets/images/avatar2.png';
import Avatar3 from '../assets/images/avatar3.png';
import Avatar4 from '../assets/images/avatar4.png';
import Avatar5 from '../assets/images/avatar5.png';
import Avatar6 from '../assets/images/avatar6.png';
import Avatar7 from '../assets/images/avatar7.png';

import LupaIcon from '../assets/images/lupa-faq.png';

type Assistant = {
    src: string;
    name: string;
    email: string;
    phone: string;
    resolvedTickets: number;
    currentTickets: number;
  };

const avatars: Assistant[] = [
  { src: Avatar1, name: 'Nome do atendente', email: 'email@email.com', phone: '(xx) xxxxx-xxxx', resolvedTickets: 10, currentTickets: 1 },
  { src: Avatar2, name: 'Nome do atendente', email: 'email@email.com', phone: '(xx) xxxxx-xxxx', resolvedTickets: 5, currentTickets: 2 },
  { src: Avatar3, name: 'Nome do atendente', email: 'email@email.com', phone: '(xx) xxxxx-xxxx', resolvedTickets: 7, currentTickets: 2 },
  { src: Avatar4, name: 'Nome do atendente', email: 'email@email.com', phone: '(xx) xxxxx-xxxx', resolvedTickets: 2, currentTickets: 3 },
  { src: Avatar5, name: 'Nome do atendente', email: 'email@email.com', phone: '(xx) xxxxx-xxxx', resolvedTickets: 2, currentTickets: 1 },
  { src: Avatar6, name: 'Nome do atendente', email: 'email@email.com', phone: '(xx) xxxxx-xxxx', resolvedTickets: 8, currentTickets: 3 },
  { src: Avatar7, name: 'Nome do atendente', email: 'email@email.com', phone: '(xx) xxxxx-xxxx', resolvedTickets: 6, currentTickets: 4 },
];

function Card({ src, name, email, phone, resolvedTickets, currentTickets }: Assistant) {
  return (
    <Link to="/previous-calls" className="w-full flex gap-3 border-gradient-faq font-inter lg:w-fit">
      <div className="flex gap-3 px-3 py-3 lg:px-5 lg:py-4">
        <img src={src} alt="" className="w-16" />
        <div className="text-xs leading-4 font-inter flex flex-col justify-center lg:text-sm ">
          <p className="text-md font-medium">{name}</p>
          <p>{email}</p>
          <p>{phone}</p>
        </div>
        <div className="hidden lg:flex lg:ml-7 lg:gap-5">
            <div className=" pt-1">
                <p className="uppercase text-sm">Tickets Resolvidos</p>
                <p className="font-bold text-3xl">{resolvedTickets}</p>
            </div>
            <div className=" pt-1">
                <p className="uppercase text-sm">Tickets Resolvidos</p>
                <p className="font-bold text-3xl">{currentTickets}</p>
            </div>
        </div>
      </div>
    </Link>
  );
}

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

const AdmPreviousCalls: React.FC = () => {
  const [calls, setCalls] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 pb-0">
      <div className="w-full ">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text mt-2 text-center">
            CHAMADOS
          </h1>
        </div>
        <div className="flex justify-center">
        <div className="flex flex-row mt-5 bg-[#222222] p-5 rounded-xl border border-[#363636] space-x-2 lg:w-1/4">
        <img src={LupaIcon} alt="Search" className="w-6 h-6" />
          <input
            type="text"
            placeholder="Buscar um ID ou assunto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" bg-transparent  outline-none w-full"
          />
        </div>
        </div>


        <div className="w-full  flex flex-col justify-center items-center">
        <div className="w-full flex mt-9">
        <div className="w-full lg:w-2/4 lg:min-w-[650px] px-5 lg:pl-5 flex flex-col space-y-4 ">
        {avatars.map((avatar, index) => (
            <Card
                key={index}
                src={avatar.src}
                name={avatar.name}
                email={avatar.email}
                phone={avatar.phone}
                resolvedTickets={avatar.resolvedTickets} // Adicionado
                currentTickets={avatar.currentTickets}  // Adicionado
            />
            ))}

        </div>
<div className="w-full hidden lg:flex">
    <div className="mr-5 border-gradient-previous-table h-[48rem] left-0 right-0 rounded-md bg-[#2a2a2a] overflow-y-auto w-full">
          <div className="px-4 py-2 pb-2 ">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <span className="text-gray-200">Carregando...</span>
              </div>
            ) : error ? (
              <p className="text-center">Erro: {error}</p>
            ) : (
              <table className="min-w-full text-sm text-left text-gray-300 table-fixed">
                <thead className="text-base uppercase border-b text-gray-300">
                  <tr>
                    <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('numeroTicket')}>
                      ID {renderSortArrow('numeroTicket')}
                    </th>
                    <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('dataAbertura')}>
                      Abertura {renderSortArrow('dataAbertura')}
                    </th>
                    <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('descricaoTicket')}>
                      Assunto {renderSortArrow('descricaoTicket')}
                    </th>
                    <th className="px-2 py-2 cursor-pointer" onClick={() => handleSort('dataAtualizacao')}>
                      Atualização {renderSortArrow('dataAtualizacao')}
                    </th>
                    <th className="px-2 py-2 cursor-pointer text-center" onClick={() => handleSort('descricaoEstadoTicket')}>
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
                        className="border-b border-gray-700 hover:bg-zinc-700/40 cursor-pointer"
                      >
                        <td className="px-2 py-2 break-words">{call.numeroTicket || 'N/A'}</td>
                        <td className="px-2 py-2 break-words">{formatUnixTimestampToDateTime(call.dataAbertura)}</td>
                        <td className="px-2 py-2 break-words">{call.descricaoTicket || 'N/A'}</td>
                        <td className="px-2 py-2 break-words">{formatUnixTimestampToDateTime(call.dataAtualizacao)}</td>
                        <td className="px-2 py-2 text-center">
                          <span
                            className={`inline-block py-1 px-3 rounded-lg font-bold text-xs uppercase ${
                              call.descricaoEstadoTicket === 'Resolvido'
                                ? 'bg-lime-800 text-lime-400'
                                : call.descricaoEstadoTicket === 'Em Andamento'
                                ? 'bg-yellow-800 text-yellow-200'
                                : 'bg-zinc-700 text-zinc-400'
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
        </div>
        </div>

        </div>

      </div>
      </div>
  );
};

export default AdmPreviousCalls;
