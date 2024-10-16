import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Definir a interface do ticket completo
interface TicketDetails 
{
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
interface TicketComment 
{
    idTicket: number;
  idComentario: number;
  textoComentario: string;
  numeroTicket: string;
}

const TicketDetailsPage: React.FC = () => 
{
  const { idTicket } = useParams<{ idTicket: string }>(); // Obter o id do ticket da URL
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [comments, setComments] = useState<TicketComment[]>([]); // Estado para os comentários
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  console.log('ID do Ticket:', idTicket); // Verificar se o idTicket está correto

  const ticketUrl = `https://softtek-api-5e04b4d63dfd.herokuapp.com/api/dadosticket?idticket=${idTicket}`;
  const commentsUrl = `https://softtek-api-5e04b4d63dfd.herokuapp.com/api/comentariosticket?idticket=${idTicket}`;

  // Função para buscar dados de um ticket específico
  const fetchTicketDetails = async () => 
  {
    try 
    {
      const response = await fetch(ticketUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) 
      {
        throw new Error(`Erro ao buscar dados do ticket: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados do Ticket:', data); // Log para verificar os dados do ticket
      setTicket(data); // Atualiza o estado com os dados do ticket
      setIsLoading(false);
    } 
    catch (error: any) 
    {
      console.error('Erro ao buscar detalhes do ticket:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Função para buscar comentários do ticket
  const fetchTicketComments = async () => 
  {
    try 
    {
      const response = await fetch(commentsUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) 
      {
        throw new Error(`Erro ao buscar comentários do ticket: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dados dos Comentários:', data); // Log para verificar os comentários
      // Verifique se `data.content` é um array antes de setar no estado
      if (Array.isArray(data.content)) 
      {
        setComments(data.content);
      } 
      else 
      {
        throw new Error('Comentários retornados não são um array.');
      }
    } 
    catch (error: any) 
    {
      console.error('Erro ao buscar comentários:', error);
      setCommentsError(error.message);
    }
  };

  useEffect(() => 
  {
    if (idTicket) 
    {
      fetchTicketDetails();
      fetchTicketComments(); // Buscar os comentários ao carregar a página
    } 
    else 
    {
      setError('ID do ticket não encontrado');
      setIsLoading(false);
    }
  }, [idTicket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-4">
      {isLoading ? (
        <p>Carregando dados do ticket...</p>
      ) : error ? (
        <p className="text-red-500">Erro: {error}</p>
      ) : (
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-4">Detalhes do Ticket</h1>
          <p><strong>ID:</strong> {ticket?.idTicket}</p>
          <p><strong>Número do Ticket:</strong> {ticket?.numeroTicket}</p>
          <p><strong>Descrição:</strong> {ticket?.descricaoTicket}</p>
          <p><strong>Prioridade:</strong> {ticket?.descricaoPrioridadeTicket}</p>
          <p><strong>Sintoma:</strong> {ticket?.descricaoSintomaTicket || 'N/A'}</p>
          <p><strong>Solução:</strong> {ticket?.resolucaoTicket}</p>
          <p><strong>Qualificação do Sintoma:</strong> {ticket?.qualificacaoSintoma || 'N/A'}</p>
          <p><strong>Data de Abertura:</strong> {ticket ? new Date(ticket.dataAbertura).toLocaleString('pt-BR') : 'N/A'}</p>
          <p><strong>Data de Atualização:</strong> {ticket?.dataAtualizacao ? new Date(ticket.dataAtualizacao).toLocaleString('pt-BR') : 'N/A'}</p>
          <p><strong>Data de Resolução:</strong> {ticket?.dataRelatorioResolvido ? new Date(ticket.dataRelatorioResolvido).toLocaleString('pt-BR') : 'N/A'}</p>
          <p><strong>Data de Encerramento:</strong> {ticket?.dataEncerramento ? new Date(ticket.dataEncerramento).toLocaleString('pt-BR') : 'N/A'}</p>
          <p><strong>Subcategoria Relatório:</strong> {ticket?.descricaoSubcategoriaRelatorio}</p>
          <p><strong>Categoria Relatório:</strong> {ticket?.descricaoCategoriaRelatorio}</p>
          <p><strong>Local:</strong> {ticket?.nomeLocal}</p>
          <p><strong>Categoria Técnico:</strong> {ticket?.descricaoCategoriaTecnico}</p>
          <p><strong>Grupo de Atribuição:</strong> {ticket?.descricaoGrupoAtribuicao}</p>
          <p><strong>Grupo Categoria Técnico:</strong> {ticket?.descricaoGrupoCategoriaTecnico}</p>
          <p><strong>Grupo Solicitante:</strong> {ticket?.descricaoGrupoSolicitante}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Comentários</h2>
          {commentsError ? (
            <p className="text-red-500">Erro ao carregar comentários: {commentsError}</p>
          ) : comments.length === 0 ? (
            <p>Nenhum comentário disponível.</p>
          ) : (
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.idComentario} className="border-b border-gray-600 pb-2">
                  <p><strong>Comentário:</strong> {comment.textoComentario} {comment.idTicket}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketDetailsPage;
