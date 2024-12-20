import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AvatarChamados from '../assets/images/avatar.png';
import { Link } from 'react-router-dom';

// Definir a interface do ticket completo
interface TicketDetails {
  idTicket: number;
  numeroTicket: string;
  descricaoTicket: string;
  descricaoEstadoTicket: string;
  resolucaoTicket: string;
  descricaoPrioridadeTicket: string;
  descricaoSintomaTicket: string | null;
  qualificacaoSintoma: string;
  dataAbertura: number;
  dataAtualizacao: number | null;
  dataRelatorioResolvido: number | null;
  dataEncerramento: number | null;
  descricaoSubcategoriaRelatorio: string;
  descricaoCategoriaRelatorio: string;
  nomeLocal: string;
  descricaoCategoriaTecnico: string;
  descricaoGrupoAtribuicao: string;
  descricaoGrupoCategoriaTecnico: string;
  descricaoGrupoSolicitante: string;
}

// Definir a interface para os comentários
interface TicketComment {
  idTicket: number;
  idComentario: number;
  textoComentario: string;
  numeroTicket: string;
}

const TicketDetailsPage: React.FC = () => {
  const { idTicket } = useParams<{ idTicket: string }>(); // Obter o id do ticket da URL
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [comments, setComments] = useState<TicketComment[]>([]); // Estado para os comentários
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1028) {
        //setIsOpen(true);
        setIsMobile(true);
      } else {
        //setIsOpen(false);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('ID do Ticket:', idTicket); // Verificar se o idTicket está correto

  const ticketUrl = `https://softtek-api-5e04b4d63dfd.herokuapp.com/api/dadosticket?idticket=${idTicket}`;
  const commentsUrl = `https://softtek-api-5e04b4d63dfd.herokuapp.com/api/comentariosticket?idticket=${idTicket}`;

  // Função para buscar dados de um ticket específico
  const fetchTicketDetails = async () => {
    try {
      const response = await fetch(ticketUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados do ticket: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados do Ticket:', data); // Log para verificar os dados do ticket
      setTicket(data); // Atualiza o estado com os dados do ticket
      setIsLoading(false);
    }
    catch (error: any) {
      console.error('Erro ao buscar detalhes do ticket:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Função para buscar comentários do ticket
  const fetchTicketComments = async () => {
    try {
      const response = await fetch(commentsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar comentários do ticket: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados dos Comentários:', data); // Log para verificar os comentários
      // Verifique se `data.content` é um array antes de setar no estado
      if (Array.isArray(data.content)) {
        setComments(data.content);
      }
      else {
        throw new Error('Comentários retornados não são um array.');
      }
    }
    catch (error: any) {
      console.error('Erro ao buscar comentários:', error);
      setCommentsError(error.message);
    }
  };

  useEffect(() => {
    if (idTicket) {
      fetchTicketDetails();
      fetchTicketComments(); // Buscar os comentários ao carregar a página
    }
    else {
      setError('ID do ticket não encontrado');
      setIsLoading(false);
    }
  }, [idTicket]);

  return (

    <div className="flex flex-col w-full items-center min-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 font-inter ">
          {isModalOpen && (
      <div className="fixed inset-0 bg-zinc-950/70 flex items-center justify-center z-10 font-inter">
        <div className="rounded-xl py-5 px-6 bg-red-950 border border-red-900 flex justify-center items-center">
          <div className="font-semibold text-lg px-1 flex items-center justify-center text-red-200">
            Você não possui permissão para editar um chamado
          </div>
          <button
            className="px-3 py-2 ml-3 bg-red-600 rounded-md text-[#252525] font-semibold"
            onClick={() => setIsModalOpen(false)} // Fechar modal
          >
            Voltar
          </button>
        </div>
      </div>
    )}

      <div className='flex flex-col justify-between px-2 md:flex-row items-center 2xl:w-4/6 lg:w-full xl:w-5/6'>
      <Link to='/previous-calls'className="hidden lg:flex">
      <svg width="20" height="20" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.375 14.25L0.5 7.375M0.5 7.375L7.375 0.5M0.5 7.375H14.9375C15.9306 7.375 16.914 7.57061 17.8315 7.95066C18.7491 8.33071 19.5828 8.88776 20.285 9.59C20.9872 10.2922 21.5443 11.1259 21.9243 12.0435C22.3044 12.961 22.5 13.9444 22.5 14.9375C22.5 15.9306 22.3044 16.914 21.9243 17.8315C21.5443 18.7491 20.9872 19.5828 20.285 20.285C19.5828 20.9872 18.7491 21.5443 17.8315 21.9243C16.914 22.3044 15.9306 22.5 14.9375 22.5H10.125" stroke="#747474" stroke-linecap="round" stroke-linejoin="round"/>
      </svg></Link>

        <h1 className="text-4xl my-8 font-extrabold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text  md:text-center text-center ">
          CHAMADOS
        </h1>
        <button onClick={() => setIsModalOpen(true)} className="hidden lg:flex" >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z" stroke="#747474" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 23.395V19L13 6L7 19V23.395" stroke="#747474" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 21C13 20.2044 13.3161 19.4413 13.8787 18.8787C14.4413 18.3161 15.2044 18 16 18C16.7956 18 17.5587 18.3161 18.1213 18.8787C18.6839 19.4413 19 20.2044 19 21" stroke="#747474" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M13 25V21C13 20.2044 12.6839 19.4413 12.1213 18.8787C11.5587 18.3161 10.7956 18 10 18C9.20435 18 8.44129 18.3161 7.87868 18.8787C7.31607 19.4413 7 20.2044 7 21" stroke="#747474" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.7688 13H16.2313" stroke="#747474" stroke-linecap="round" stroke-linejoin="round" />
        </svg></button>

      </div>
      {isLoading ? (
        <p>Carregando dados do ticket...</p>
      ) : error ? (
        <p className="text-red-500">Erro: {error}</p>
      ) : (
        <div className="2xl:w-4/6 lg:w-full xl:w-5/6">
          {!isMobile && (
            <>
            <div>
                <div className=" w-full  flex flex-wrap flex-row  border-gradient-previous-table">
                  <div className='flex flex-col flex-wrap gap-5 w-full p-5'>
                    <div className='flex flex-row justify-between w-full flex-wrap'>
                      <div>
                        <p><strong>ID</strong>
                          <div>
                            {ticket?.numeroTicket}
                          </div>
                        </p>
                      </div>
                      <div>
                        <p><strong>ABERTURA</strong>
                        <div>
                          {ticket ? new Date(ticket.dataAbertura * 1000).toLocaleString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: '2-digit'
                          }) : 'N/A'}
                        </div>
                        </p>
                      </div>

                      <div>
                        <p><strong>ASSUNTO</strong>
                          <div>
                            {ticket?.descricaoTicket}
                          </div>
                        </p>
                      </div>

                      <div>
                        <p>
                          <strong>STATUS</strong>
                          <span
                            className={`inline-block py-1 px-3 rounded-lg font-bold w-full text-center  ${
                              ticket?.descricaoEstadoTicket === 'Resolvido'
                                ? 'text-xs uppercase bg-lime-800 text-lime-400'
                                : ticket?.descricaoEstadoTicket === 'Em Andamento'
                                ? 'text-xs uppercase bg-yellow-800 text-yellow-200'
                                : 'text-xs uppercase bg-zinc-700 text-zinc-400'
                            }`}
                          >
                            {ticket?.descricaoEstadoTicket || 'N/A'}
                          </span>
                        </p>
                      </div>

                      <div>
                        <p><strong>ATUALIZAÇÃO</strong>
                          <div>
                          {ticket?.dataAtualizacao ? 
                          new Date(ticket.dataAtualizacao * 1000).toLocaleString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: '2-digit'
                          }) : 'N/A'}
                          </div>
                        </p>
                      </div>

                      <div>
                        <p><strong>ENCERRAMENTO</strong>
                          <div>
                          {ticket?.dataEncerramento ? 
                            new Date(ticket.dataEncerramento * 1000).toLocaleString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit', 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: '2-digit' 
                            }) : 'N/A'}
                          </div>
                        </p>
                      </div>

                      <div>
                        <p><strong>RESOLUÇÃO</strong>
                          <div>
                          {ticket?.dataRelatorioResolvido ? 
                          new Date(ticket.dataRelatorioResolvido * 1000).toLocaleString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: '2-digit' 
                          }) : 'N/A'}
                          </div>
                        </p>
                      </div>

                    </div>

                    <div className='p-4 flex flex-row justify-around w-full flex-wrap'>

                      <div className='w-[25%]'>
                        <div className='flex flex-col gap-2 items-start justify-around  h-[12rem] '>
                          <p><strong>RESPONSÁVEL:</strong></p>
                          <img src={AvatarChamados} className='h-20 w-h-20' alt="Avatar" />
                          <div className='text-sm'>
                            <p><b>Nome do Atendente</b></p>
                            <p>email@email.com</p>
                            <p>(xx) xxxx-xxxx</p>
                            <p><b>Categoria:</b> Analista AMS</p>
                          </div>
                        </div>
                      </div>
                      <div className='w-[40%]  h-[12rem] flex flex-row items-start justify-start mt-1'>
                        <div className='flex flex-col w-[50%] gap-6 text-lg'>
                          <strong>PRIORIDADE: </strong>
                          <strong>GRUPO ATRIBUIÇÃO: </strong>
                          <strong>GRUPO CATEGORIA: </strong>
                          <strong>GRUPO SOLICITANTE: </strong>
                        </div>
                        <div className='flex flex-col gap-6 text-lg'>
                          <p>{ticket?.descricaoPrioridadeTicket}</p>
                          <p>{ticket?.descricaoGrupoAtribuicao}</p>
                          <p>{ticket?.descricaoGrupoCategoriaTecnico}</p>
                          <p>{ticket?.descricaoGrupoSolicitante}</p>
                        </div>
                      </div>
                      <div className='w-[33%]  h-[12rem] flex flex-col gap-2 items-start justify-start text-xl '>
                        <strong>ANOTAÇÕES: </strong>
                      </div>
                    </div>
                  </div>

                </div><h2 className="text-2xl font-bold mt-4 mb-4">Comentários</h2>
                {commentsError ? (
                  <p className="text-red-500">Erro ao carregar comentários: {commentsError}</p>
                ) : comments.length === 0 ? (
                  <p>Nenhum comentário disponível.</p>
                ) : (
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <div key={comment.idComentario} className="border-b border-gray-600 pb-2">
                        <p><strong>Comentário:</strong> {comment.textoComentario}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className='flex items-center'>
                  <strong className='text-xl mr-6'>Comentar: </strong>
                  <input
                    type="text"
                    className="my-4 p-3 h-10  bg-[#222222] rounded-lg  border  border-[#363636] focus:outline-none focus:bg-[#1a1a1a]"
                  /></div>
              </div>
            </>
          )}
          {isMobile && (
            <>
            
              <div className=''>
              <div className="w-full border-gradient-previous-table flex flex-col items-center text-sm">
                <div className="p-7 w-full">

                  <div className="flex flex-col items-center text-center gap-4">
                    <p className="text-base font-bold">RESPONSÁVEL:</p>
                    <img src={AvatarChamados} className="h-20 w-20 rounded-full" alt="Avatar" />
                    <div className="text-sm">
                      <p className="font-bold">Nome do Atendente</p>
                      <p>email@email.com</p>
                      <p>(xx) xxxx-xxxx</p>
                      <p><strong>Categoria:</strong> Analista AMS</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-6">
                    <div className="flex flex-col items-start">
                      <p className="font-bold">ID</p>
                      <p className="mt-1">{ticket?.numeroTicket || 'N/A'}</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="font-bold">ABERTURA</p>
                      <p className="mt-1">
                        {ticket ? new Date(ticket.dataAbertura).toLocaleString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric' 
                        }) : 'N/A'}
                      </p>
                    </div>

                    <div className="flex flex-col items-start">
                      <p className="font-bold">ASSUNTO</p>
                      <p className="mt-1">{ticket?.descricaoTicket || 'N/A'}</p>
                    </div>

                    <div className="flex flex-col items-start">
                    <p>
                      <strong>STATUS</strong>
                      <span
                        className={`inline-block py-1 px-1 rounded-lg font-bold w-full text-center mt-1 ${
                          ticket?.descricaoEstadoTicket === 'Resolvido'
                            ? 'text-xs uppercase bg-lime-800 text-lime-400'
                            : ticket?.descricaoEstadoTicket === 'Em Andamento'
                            ? 'text-xs uppercase bg-yellow-800 text-yellow-200'
                            : 'text-xs uppercase bg-zinc-700 text-zinc-400'
                        }`}
                      >
                        {ticket?.descricaoEstadoTicket || 'N/A'}
                      </span>
                    </p>
                    </div>

                    <div className="flex flex-col items-start">
                      <p className="font-bold">ATUALIZAÇÃO</p>
                      <p className="mt-1">
                        {ticket?.dataAtualizacao ? new Date(ticket.dataAtualizacao).toLocaleString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric' 
                        }) : 'N/A'}
                      </p>
                    </div>

                    <div className="flex flex-col items-start">
                      <p className="font-bold">RESOLUÇÃO</p>
                      <p className="mt-1">
                        {ticket?.dataRelatorioResolvido ? new Date(ticket.dataRelatorioResolvido).toLocaleString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric' 
                        }) : 'N/A'}
                      </p>
                    </div>
                    <div className="flex flex-col items-start">
                      <p className="font-bold">ENCERRAMENTO</p>
                      <p className="mt-1">
                        {ticket?.dataEncerramento ? new Date(ticket.dataEncerramento).toLocaleString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit', 
                          day: '2-digit', 
                          month: '2-digit', 
                          year: 'numeric' 
                        }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


                <h2 className="text-2xl font-bold mt-4 mb-4">Comentários</h2>
                {commentsError ? (
                  <p className="text-red-500">Erro ao carregar comentários: {commentsError}</p>
                ) : comments.length === 0 ? (
                  <p>Nenhum comentário disponível.</p>
                ) : (
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <div key={comment.idComentario} className="border-b border-gray-600 pb-2">
                        <p><strong>Comentário:</strong> {comment.textoComentario}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className='flex flex-col mt-4'>
                  <strong className='text-xl mr-6'>Comentar: </strong>
                  <input
                    type="text"
                    className="my-2 p-3 h-11 bg-[#222222] rounded-lg  border  border-[#363636] focus:outline-none focus:bg-[#1a1a1a]  "
                  /></div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketDetailsPage;
