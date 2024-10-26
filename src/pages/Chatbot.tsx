import React, { useEffect, useState } from 'react';
import BotIcon from '../assets/images/2.png';
import AnexoIcon from '../assets/images/8.png';
import EnviarIcon from '../assets/images/9.png';
import CattyHi from '../assets/images/cattyHi.png';
import { Link } from 'react-router-dom';

// Função para formatar a data e hora
const formatDateTime = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const Message = ({ text, isUserMessage, image, timestamp }: { text?: string | JSX.Element, isUserMessage: boolean, image?: string, timestamp: Date }) => {
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} my-2`}>
      {!isUserMessage && (
        <img src={BotIcon} alt="Bot" className="w-12 h-12 rounded-full mr-2 self-end" />
      )}

      <div className="flex flex-col">
        <div className={`max-w-lg p-3 ${isUserMessage
          ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl'
          : 'rounded-tl-2xl rounded-br-2xl rounded-tr-2xl'} 
          ${isUserMessage ? 'bg-[#3cd0db]' : 'bg-[#A7E2E4]'} text-gray-800 break-words whitespace-pre-wrap`}>
          {image ? (
            <img src={image} alt="User upload" className="rounded-2xl" />
          ) : typeof text === 'string' ? (
            text
          ) : (
            text
          )}
        </div>
        <span className={`text-xs text-gray-400 mt-1 ${isUserMessage ? 'text-right' : 'text-left'}`}>
          {formatDateTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text?: string | JSX.Element, isUserMessage: boolean, image?: string, timestamp: Date }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [firstMessage, setIsFirst] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newMessages = [{ image: reader.result as string, isUserMessage: true, timestamp: new Date() }, ...messages];
        setMessages(newMessages);

        setTimeout(() => {
          const botResponse = 'Você enviou uma imagem! Parece interessante!';
          setMessages([{ text: botResponse, isUserMessage: false, timestamp: new Date() }, ...newMessages]);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    setIsFirst(true);
    if (userInput.trim() === '') return;

    const newMessages = [{ text: userInput, isUserMessage: true, timestamp: new Date() }, ...messages];
    setMessages(newMessages);
    setUserInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      setMessages([{ text: botResponse, isUserMessage: false, timestamp: new Date() }, ...newMessages]);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): JSX.Element | string => {
    const responses: { [key: string]: { keywords: string[], response: JSX.Element | string } } = {
      manutencaoPerfil: {
        keywords: ['manutenção', 'perfil'],
        response: (
          <div>
            <p>Para realizar a manutenção de perfis no SYSTEMA Y, siga os passos abaixo:</p>
            <br />
            <ol>
              <li><strong>Acesse o SYSTEMA Y:</strong> Utilize o link do ambiente de produção ou de outros ambientes (DEV, QAS) conforme o caso.</li>
              <br />
              <li><strong>Selecione "Perfil":</strong> Na tela de perfil, informe o nome do perfil a ser alterado e clique em "Gravar".</li>
              <br />
              <li><strong>Altere o status do perfil:</strong> Para ativar ou desativar, clique em "Alterar status". Um pop-up aparecerá para confirmar a mudança.</li>
            </ol>
            <br />
            <p>Caso tenha dificuldades, entre em contato com o suporte de acessos.</p>
          </div>
        )
      },
      simulacao: {
        keywords: ['imule', 'usuário'],
        response: (
          <div>
            <p>Claro! Vou simular que sou um usuário com um problema comum para que você possa praticar. Vamos começar:</p>
            <br />
            <p className="font-semibold">Usuário (Simulado por mim):</p>
            <p>Olá, estou tentando acessar o sistema mas continuo recebendo uma mensagem de erro dizendo que o usuário ou a senha são inválidos. Você pode me ajudar?</p>
          </div>
        )
      },
      prorrogacaoAcesso: {
        keywords: ['prorrogar', 'acesso'],
        response: (
          <div>
            <p>Para prorrogar o acesso de terceiros no SAP, siga as etapas abaixo:</p>
            <br />
            <ol>
              <li><strong>Verifique o e-mail do gestor:</strong> Compare o e-mail do gestor solicitante com o registrado na transação ZBO103.</li>
              <br />
              <li><strong>Acesse a transação ZBO103:</strong> Clique em "Alterar", insira o número do chamado, o motivo "Prorrogação de Acessos", e a nova data de desligamento. Clique em "Salvar".</li>
              <br />
              <li><strong>Classifique o chamado:</strong> Utilize "Prorrogação/Revogação de Acesso de Terceiro" e atribua à equipe N1 - OUTROS.</li>
            </ol>
            <br />
            <p>Se precisar de ajuda, estou por aqui!</p>
          </div>
        )
      },
      revogacaoAcesso: {
        keywords: ['revogar', 'acesso'],
        response: (
          <div>
            <p>Para revogar o acesso de terceiros no SAP, siga as etapas abaixo:</p>
            <br />
            <ol>
              <li><strong>Verifique o e-mail do gestor:</strong> Compare o e-mail do gestor solicitante com o registrado na transação ZBO103.</li>
              <br />
              <li><strong>Acesse a transação ZBO104:</strong> Selecione a flag "Revogação Programada", insira a data de término e clique em "Salvar".</li>
              <br />
              <li><strong>Classifique o chamado:</strong> Utilize "Prorrogação/Revogação de Acesso de Terceiro" e atribua à equipe N1 - OUTROS.</li>
            </ol>
            <br />
            <p>Caso precise de mais suporte, estou à disposição!</p>
          </div>
        )
      },
      ativarInativarConta: {
        keywords: ['inativar', 'conta'],
        response: (
          <div>
            <p>Para ativar ou inativar uma conta de usuário no SAP, siga os passos:</p>
            <br />
            <ol>
              <li><strong>Acesse o SAP Logon:</strong> Clique no ambiente "SAP ERP Produção".</li>
              <br />
              <li><strong>Encontre o usuário:</strong> Insira o número da identidade ou CPF, selecione a conta e clique em "Ativar/Inativar Conta".</li>
              <br />
              <li><strong>Confirme a alteração:</strong> Verifique se o campo "Status cta" está conforme solicitado ("A" para ativo, "I" para inativo).</li>
            </ol>
            <br />
            <p>Se precisar de ajuda adicional, estarei por aqui!</p>
          </div>
        )
      },
      ativarInativarConta2: {
        keywords: ['ativar', 'conta'],
        response: (
          <div>
            <p>Para ativar ou inativar uma conta de usuário no SAP, siga os passos:</p>
            <br />
            <ol>
              <li><strong>Acesse o SAP Logon:</strong> Clique no ambiente "SAP ERP Produção".</li>
              <br />
              <li><strong>Encontre o usuário:</strong> Insira o número da identidade ou CPF, selecione a conta e clique em "Ativar/Inativar Conta".</li>
              <br />
              <li><strong>Confirme a alteração:</strong> Verifique se o campo "Status cta" está conforme solicitado ("A" para ativo, "I" para inativo).</li>
            </ol>
            <br />
            <p>Se precisar de ajuda adicional, estarei por aqui!</p>
          </div>
        )
      },
      ativarInativarTransferir: {
        keywords: ['ativar', 'licença'],
        response: (
          <div>
            <p>Para ativar, inativar ou transferir licenças de usuários no SYSTEMA Y, siga os passos:</p>
            <br />
            <ol>
              <li><strong>Selecione o usuário:</strong> Acesse o sistema, clique em "Manage Users", filtre pelo usuário e clique em "Edit User".</li>
              <br />
              <li><strong>Ativação/Inativação:</strong> Marque ou desmarque o parâmetro "Enabled" para ativar ou inativar o usuário.</li>
              <br />
              <li><strong>Transferência de licença:</strong> Selecione o usuário que receberá a licença e ajuste os parâmetros necessários.</li>
            </ol>
            <br />
            <p>Se precisar de mais detalhes, estou à disposição!</p>
          </div>
        )
      },
      ativarInativarTransferir2: {
        keywords: ['inativar',  'licença'],
        response: (
          <div>
            <p>Para ativar, inativar ou transferir licenças de usuários no SYSTEMA Y, siga os passos:</p>
            <br />
            <ol>
              <li><strong>Selecione o usuário:</strong> Acesse o sistema, clique em "Manage Users", filtre pelo usuário e clique em "Edit User".</li>
              <br />
              <li><strong>Ativação/Inativação:</strong> Marque ou desmarque o parâmetro "Enabled" para ativar ou inativar o usuário.</li>
              <br />
              <li><strong>Transferência de licença:</strong> Selecione o usuário que receberá a licença e ajuste os parâmetros necessários.</li>
            </ol>
            <br />
            <p>Se precisar de mais detalhes, estou à disposição!</p>
          </div>
        )
      },
      ativarInativarTransferir3: {
        keywords: ['transferir', 'licença'],
        response: (
          <div>
            <p>Para ativar, inativar ou transferir licenças de usuários no SYSTEMA Y, siga os passos:</p>
            <br />
            <ol>
              <li><strong>Selecione o usuário:</strong> Acesse o sistema, clique em "Manage Users", filtre pelo usuário e clique em "Edit User".</li>
              <br />
              <li><strong>Ativação/Inativação:</strong> Marque ou desmarque o parâmetro "Enabled" para ativar ou inativar o usuário.</li>
              <br />
              <li><strong>Transferência de licença:</strong> Selecione o usuário que receberá a licença e ajuste os parâmetros necessários.</li>
            </ol>
            <br />
            <p>Se precisar de mais detalhes, estou à disposição!</p>
          </div>
        )
      },
      alteracaoAcesso: {
        keywords: ['alterar', 'acesso'],
        response: (
          <div>
            <p>Para alterar o acesso de um usuário no SYSTEMA Y, siga estas etapas:</p>
            <br />
            <ol>
              <li><strong>Faça login no SYSTEMA Y:</strong> Acesse o link fornecido para o sistema e entre com suas credenciais.</li>
              <br />
              <li><strong>Selecione "Controle de Acesso":</strong> No menu "Administração", escolha "Controle de Acesso" e depois clique em "Usuário".</li>
              <br />
              <li><strong>Altere o acesso:</strong> Encontre o usuário, clique em "Editar Usuário", ajuste as atribuições necessárias e clique em "Salvar Usuário".</li>
            </ol>
            <br />
            <p>Se precisar de suporte adicional, estou à disposição.</p>
          </div>
        )
      },
      alteracaoAcesso2: {
        keywords: ['altero', 'acesso'],
        response: (
          <div>
            <p>Para alterar o acesso de um usuário no SYSTEMA Y, siga estas etapas:</p>
            <br />
            <ol>
              <li><strong>Faça login no SYSTEMA Y:</strong> Acesse o link fornecido para o sistema e entre com suas credenciais.</li>
              <br />
              <li><strong>Selecione "Controle de Acesso":</strong> No menu "Administração", escolha "Controle de Acesso" e depois clique em "Usuário".</li>
              <br />
              <li><strong>Altere o acesso:</strong> Encontre o usuário, clique em "Editar Usuário", ajuste as atribuições necessárias e clique em "Salvar Usuário".</li>
            </ol>
            <br />
            <p>Se precisar de suporte adicional, estou à disposição.</p>
          </div>
        )
      },
      criacaoAcesso: {
        keywords: ['criar', 'novo', 'acesso'],
        response: (
          <div>
            <p>Para criar um novo acesso no SYSTEMA Y, siga estas instruções:</p>
            <br />
            <ol>
              <li><strong>Acesse o SYSTEMA Y:</strong> Abra o navegador e entre com suas credenciais.</li>
              <br />
              <li><strong>Escolha "Novo Usuário":</strong> No menu de administração, clique em "Criar novo usuário" e preencha os dados necessários, como nome, CPF e perfil desejado.</li>
              <br />
              <li><strong>Finalize o cadastro:</strong> Após preencher todos os campos, clique em "Cadastrar Usuário" e informe a senha provisória ao usuário.</li>
            </ol>
            <br />
            <p>Se precisar de mais detalhes, não hesite em perguntar!</p>
          </div>
        )
      },
      criacaoAcesso2: {
        keywords: ['crio', 'novo', 'acesso'],
        response: (
          <div>
            <p>Para criar um novo acesso no SYSTEMA Y, siga estas instruções:</p>
            <br />
            <ol>
              <li><strong>Acesse o SYSTEMA Y:</strong> Abra o navegador e entre com suas credenciais.</li>
              <br />
              <li><strong>Escolha "Novo Usuário":</strong> No menu de administração, clique em "Criar novo usuário" e preencha os dados necessários, como nome, CPF e perfil desejado.</li>
              <br />
              <li><strong>Finalize o cadastro:</strong> Após preencher todos os campos, clique em "Cadastrar Usuário" e informe a senha provisória ao usuário.</li>
            </ol>
            <br />
            <p>Se precisar de mais detalhes, não hesite em perguntar!</p>
          </div>
        )
      },
      trocarEmail1: {
        keywords: ['trocar', 'email'],
        response: (
            <div>
            <p className="text-base">Para trocar o e-mail de uma empresa para outra com base no documento fornecido, siga os passos abaixo:</p>
            <br />
            <ol>
              <li><strong>Verifique a solicitação:</strong> Certifique-se de que o colaborador informou que o e-mail será alterado para o novo domínio (empresa).</li>
              <br />
              <li><strong>Acesse a ZBO103:</strong>
                <ul>
                  <li>Inicie a edição no campo "E-mail".</li>
                  <li>Altere o e-mail para o novo domínio fornecido.</li>
                </ul>
              </li>
              <br />
              <li><strong>Preencha os campos adicionais:</strong>
                <ul>
                  <li>No campo "Motivo", coloque o número do chamado.</li>
                  <li>No campo "Nr chamado", insira apenas o número da tarefa (TASK).</li>
                </ul>
              </li>
              <br />
              <li><strong>Grave as alterações</strong> na ZBO103 e no AD (Active Directory):
                <ul>
                  <li>Atualize os campos de E-mail em "General" e "Account".</li>
                </ul>
              </li>
              <br />
              <li><strong>Evidencie as alterações:</strong> Inclua as evidências no chamado para garantir o registro adequado da mudança.</li>
              <br />
              <li><strong>Abra um novo chamado:</strong>
                <ul>
                  <li>Antes de fechar o chamado atual, crie um novo chamado com as mesmas evidências e envie para a Equipe X.</li>
                  <li>Informe o número deste novo chamado no chamado inicial para fechar o processo corretamente.</li>
                </ul>
              </li>
            </ol>
            <br />
            <p>Caso precise de mais detalhes, estou à disposição!</p>
            </div>
        )
      },
      trocarEmail2: {
        keywords: ['atualizar', 'dados', 'bu'],
        response: (
          <div>
          <p className="text-base">Para trocar o e-mail de uma empresa para outra com base no documento fornecido, siga os passos abaixo:</p>
          <br />
          <ol>
            <li><strong>Verifique a solicitação:</strong> Certifique-se de que o colaborador informou que o e-mail será alterado para o novo domínio (empresa).</li>
            <br />
            <li><strong>Acesse a ZBO103:</strong>
              <ul>
                <li>Inicie a edição no campo "E-mail".</li>
                <li>Altere o e-mail para o novo domínio fornecido.</li>
              </ul>
            </li>
            <br />
            <li><strong>Preencha os campos adicionais:</strong>
              <ul>
                <li>No campo "Motivo", coloque o número do chamado.</li>
                <li>No campo "Nr chamado", insira apenas o número da tarefa (TASK).</li>
              </ul>
            </li>
            <br />
            <li><strong>Grave as alterações</strong> na ZBO103 e no AD (Active Directory):
              <ul>
                <li>Atualize os campos de E-mail em "General" e "Account".</li>
              </ul>
            </li>
            <br />
            <li><strong>Evidencie as alterações:</strong> Inclua as evidências no chamado para garantir o registro adequado da mudança.</li>
            <br />
            <li><strong>Abra um novo chamado:</strong>
              <ul>
                <li>Antes de fechar o chamado atual, crie um novo chamado com as mesmas evidências e envie para a Equipe X.</li>
                <li>Informe o número deste novo chamado no chamado inicial para fechar o processo corretamente.</li>
              </ul>
            </li>
          </ol>
          <br />
          <p>Caso precise de mais detalhes, estou à disposição!</p>
          </div>
      )
      },
            trocarEmail3: {
        keywords: ['atualizo', 'dados', 'bu'],
        response: (
          <div>
          <p className="text-base">Para trocar o e-mail de uma empresa para outra com base no documento fornecido, siga os passos abaixo:</p>
          <br />
          <ol>
            <li><strong>Verifique a solicitação:</strong> Certifique-se de que o colaborador informou que o e-mail será alterado para o novo domínio (empresa).</li>
            <br />
            <li><strong>Acesse a ZBO103:</strong>
              <ul>
                <li>Inicie a edição no campo "E-mail".</li>
                <li>Altere o e-mail para o novo domínio fornecido.</li>
              </ul>
            </li>
            <br />
            <li><strong>Preencha os campos adicionais:</strong>
              <ul>
                <li>No campo "Motivo", coloque o número do chamado.</li>
                <li>No campo "Nr chamado", insira apenas o número da tarefa (TASK).</li>
              </ul>
            </li>
            <br />
            <li><strong>Grave as alterações</strong> na ZBO103 e no AD (Active Directory):
              <ul>
                <li>Atualize os campos de E-mail em "General" e "Account".</li>
              </ul>
            </li>
            <br />
            <li><strong>Evidencie as alterações:</strong> Inclua as evidências no chamado para garantir o registro adequado da mudança.</li>
            <br />
            <li><strong>Abra um novo chamado:</strong>
              <ul>
                <li>Antes de fechar o chamado atual, crie um novo chamado com as mesmas evidências e envie para a Equipe X.</li>
                <li>Informe o número deste novo chamado no chamado inicial para fechar o processo corretamente.</li>
              </ul>
            </li>
          </ol>
          <br />
          <p>Caso precise de mais detalhes, estou à disposição!</p>
          </div>
      )
      },
      resetSenha: {
        keywords: ['resetar', 'senha'],
        response: (<div><p>Para resetar a senha de um usuário no SAP Portal, siga os passos abaixo:</p>
          <br />
          <ol>
            <li><strong>Introdução / Pré-requisitos para execução:</strong>
              <ul>
                <li>Nome completo do usuário;</li>
                <li>Login do usuário nos sistemas SAP e Portal SAP;</li>
                <li>Acesso ao SAP Solution Manager;</li>
                <li>Acesso ao Portal SAP;</li>
                <li>Chamado deve ser solicitado/registrado pelo próprio usuário ou pelo gestor imediato.</li>
              </ul>
            </li>
            <br />
            <li><strong>Acesse o SAP Portal:</strong>
              <ul>
                <li>Entre no endereço do ambiente desejado (produção, desenvolvimento ou qualidade).</li>
                <li>Informe o usuário, senha e clique em “Logon”.</li>
              </ul>
            </li>
            <br />
            <li><strong>Selecione a aba “Administração de Usuário”:</strong>
              <ul>
                <li>Informe o usuário que deseja realizar a alteração de senha e tecle "Enter".</li>
                <li>Selecione o usuário e clique em “Modificar”.</li>
              </ul>
            </li>
            <br />
            <li><strong>Altere a senha:</strong>
              <ul>
                <li>Na aba “Informações Gerais”, altere a senha nos campos “Definir Senha” e “Confirmar Senha”.</li>
                <li>Clique em “Gravar” para concluir a alteração.</li>
              </ul>
            </li>
          </ol>
          <br />
          <p>Caso precise de mais ajuda é só me chamar!</p>
          </div>

          )
      },
      resetSenha2: {
        keywords: ['reset', 'senha'],
        response: (<div><p>Para resetar a senha de um usuário no SAP Portal, siga os passos abaixo:</p>
          <br />
          <ol>
            <li><strong>Introdução / Pré-requisitos para execução:</strong>
              <ul>
                <li>Nome completo do usuário;</li>
                <li>Login do usuário nos sistemas SAP e Portal SAP;</li>
                <li>Acesso ao SAP Solution Manager;</li>
                <li>Acesso ao Portal SAP;</li>
                <li>Chamado deve ser solicitado/registrado pelo próprio usuário ou pelo gestor imediato.</li>
              </ul>
            </li>
            <br />
            <li><strong>Acesse o SAP Portal:</strong>
              <ul>
                <li>Entre no endereço do ambiente desejado (produção, desenvolvimento ou qualidade).</li>
                <li>Informe o usuário, senha e clique em “Logon”.</li>
              </ul>
            </li>
            <br />
            <li><strong>Selecione a aba “Administração de Usuário”:</strong>
              <ul>
                <li>Informe o usuário que deseja realizar a alteração de senha e tecle "Enter".</li>
                <li>Selecione o usuário e clique em “Modificar”.</li>
              </ul>
            </li>
            <br />
            <li><strong>Altere a senha:</strong>
              <ul>
                <li>Na aba “Informações Gerais”, altere a senha nos campos “Definir Senha” e “Confirmar Senha”.</li>
                <li>Clique em “Gravar” para concluir a alteração.</li>
              </ul>
            </li>
          </ol>
          <br />
          <p>Caso precise de mais ajuda é só me chamar!</p>
          </div>
          )
      },
      removeAccess: {
        keywords: ['remover', 'acesso'],
        response: (<div>
          <p>Para remover o acesso de um usuário no SISTEMA Y, siga as orientações detalhadas:</p>
          <br />
<ol>
  <li><strong>Pré-requisitos Mínimos:</strong>
    <ul>
      <li>Equipamento configurado com acesso à internet e pacote Office;</li>
      <li>Acesso ao Microsoft Dynamics CRM 365 com perfil de Administrador de Sistema;</li>
      <li>Nome do usuário e aplicativos que serão removidos;</li>
      <li>Unidade de Negócio do usuário (caso a remoção seja parcial).</li>
    </ul>
  </li>
  <br />
  <li><strong>Acesse o SISTEMA Y:</strong>
    <ul>
      <li>Navegue para: <em>SISTEMA Y &gt; Configurações &gt; Segurança &gt; Usuários</em>.</li>
      <li>Selecione o usuário para iniciar o processo de remoção de acesso.</li>
    </ul>
  </li>
  <br />
  <li><strong>Remova todos os direitos de acesso:</strong>
    <ul>
      <li>Clique em ‘Gerenciar Funções’ e retire os direitos de acesso listados, como:</li>
      <ul>
        <li>[ART] - Artes</li>
        <li>[ART] - Artes Mobile</li>
        <li>[ART] - Aprovador Briefing</li>
        <li>[ART] - Aprovador Material</li>
        <li>[ART] - Solicitante</li>
        <li>[ART] - Coordenador Artes</li>
        <li>[ART] - Equipe Artes</li>
        <li>[ART] - Responsável Trade</li>
      </ul>
    </ul>
  </li>
<br />
  <li><strong>Considerações adicionais:</strong>
    <ul>
      <li><strong>Remoção Parcial:</strong> Se o usuário ainda tiver acesso a outros aplicativos, siga o procedimento para realocação à nova Unidade de Negócio.</li>
      <li><strong>Remoção Total:</strong> 
        <ul>
          <li>Retire o direito de acesso “Colaboração” ao usuário no SharePoint Online;</li>
          <li>Revise ou retire a licença dos produtos no Centro de Administração do Office 365.</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>
<br />
<p>Espero que essas instruções sejam úteis para você! Se precisar de mais ajuda, estou à disposição.</p>

        </div>)
      },
      removeAccess2: {
        keywords: ['removo', 'acesso'],
        response:  (<div>
          <p>Para remover o acesso de um usuário no SISTEMA Y, siga as orientações detalhadas:</p>
          <br />
<ol>
  <li><strong>Pré-requisitos Mínimos:</strong>
    <ul>
      <li>Equipamento configurado com acesso à internet e pacote Office;</li>
      <li>Acesso ao Microsoft Dynamics CRM 365 com perfil de Administrador de Sistema;</li>
      <li>Nome do usuário e aplicativos que serão removidos;</li>
      <li>Unidade de Negócio do usuário (caso a remoção seja parcial).</li>
    </ul>
  </li>
  <br />
  <li><strong>Acesse o SISTEMA Y:</strong>
    <ul>
      <li>Navegue para: <em>SISTEMA Y &gt; Configurações &gt; Segurança &gt; Usuários</em>.</li>
      <li>Selecione o usuário para iniciar o processo de remoção de acesso.</li>
    </ul>
  </li>
  <br />
  <li><strong>Remova todos os direitos de acesso:</strong>
    <ul>
      <li>Clique em 'Gerenciar Funções' e retire os direitos de acesso listados, como:</li>
      <ul>
        <li>[ART] - Artes</li>
        <li>[ART] - Artes Mobile</li>
        <li>[ART] - Aprovador Briefing</li>
        <li>[ART] - Aprovador Material</li>
        <li>[ART] - Solicitante</li>
        <li>[ART] - Coordenador Artes</li>
        <li>[ART] - Equipe Artes</li>
        <li>[ART] - Responsável Trade</li>
      </ul>
    </ul>
  </li>
<br />
  <li><strong>Considerações adicionais:</strong>
    <ul>
      <li><strong>Remoção Parcial:</strong> Se o usuário ainda tiver acesso a outros aplicativos, siga o procedimento para realocação à nova Unidade de Negócio.</li>
      <li><strong>Remoção Total:</strong> 
        <ul>
          <li>Retire o direito de acesso “Colaboração” ao usuário no SharePoint Online;</li>
          <li>Revise ou retire a licença dos produtos no Centro de Administração do Office 365.</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>
<br />
<p>Espero que essas instruções sejam úteis para você! Se precisar de mais ajuda, estou à disposição.</p>

        </div>)
      },
      unblock1: {
        keywords: ['desbloquear'],
        response: (<div>
          <p>Para desbloquear o acesso de um usuário no sistema SAP e Portal SAP, siga os passos detalhados:</p>
          <br />
<ol>
  <li><strong>Pré-requisitos:</strong>
    <ul>
      <li>Nome completo do usuário;</li>
      <li>Login do usuário nos sistemas SAP e Portal SAP;</li>
      <li>Acesso ao SAP Solution Manager;</li>
      <li>Acesso ao Portal SAP;</li>
      <li>Chamado deve ser solicitado/registrado pelo próprio usuário ou pelo gestor imediato.</li>
    </ul>
  </li>
  <br />
  <li><strong>Verifique o gestor responsável:</strong>
    <ul>
      <li>Confirme se o gestor que solicitou o desbloqueio é o mesmo cadastrado na transação ZBO103.</li>
      <li>Se forem diferentes, abra um chamado para correção de dados cadastrais e ajuste o gestor responsável antes de continuar.</li>
    </ul>
  </li>
  <br />
  <li><strong>Acesse o sistema SAP no ambiente 06 (SAP Solution Manager):</strong>
    <ul>
      <li>Digite a transação “SU01” e pressione "Enter".</li>
      <li>Clique no matchcode e informe o nome do usuário.</li>
      <li>Selecione o usuário e clique para desbloqueá-lo.</li>
      <li>Informe o número do chamado e clique em "Enter".</li>
    </ul>
  </li>
  <br />
  <li><strong>Acesse o SAP Portal no ambiente desejado:</strong>
    <ul>
      <li>Entre no ambiente (produção, desenvolvimento ou qualidade) e faça login.</li>
      <li>Selecione a aba “Administração de Usuário” e informe o usuário para desbloqueio.</li>
      <li>Na aba “Informações sobre a conta”, certifique-se de que o campo “Senha bloqueada” está selecionado.</li>
      <li>Clique em “Modificar” para desbloquear.</li>
    </ul>
  </li>
  <br />
  <li><strong>Redefina a senha, se necessário:</strong>
    <ul>
      <li>Na aba “Informações gerais”, insira a nova senha nos campos “Definir senha” e “Confirmar senha”.</li>
      <li>Clique em “Gravar” e certifique-se de que o campo “Senha bloqueada” não está mais selecionado.</li>
    </ul>
  </li>
</ol>
<br />
<p>Espero que isso ajude! Se precisar de mais alguma coisa, estou à disposição.</p>

        </div>)
      },
      unblock2: {
        keywords: ['tirar', 'bloqueio'],
        response: (<div>
          <p>Para desbloquear o acesso de um usuário no sistema SAP e Portal SAP, siga os passos detalhados:</p>
          <br />
<ol>
  <li><strong>Pré-requisitos:</strong>
    <ul>
      <li>Nome completo do usuário;</li>
      <li>Login do usuário nos sistemas SAP e Portal SAP;</li>
      <li>Acesso ao SAP Solution Manager;</li>
      <li>Acesso ao Portal SAP;</li>
      <li>Chamado deve ser solicitado/registrado pelo próprio usuário ou pelo gestor imediato.</li>
    </ul>
  </li>
  <br />
  <li><strong>Verifique o gestor responsável:</strong>
    <ul>
      <li>Confirme se o gestor que solicitou o desbloqueio é o mesmo cadastrado na transação ZBO103.</li>
      <li>Se forem diferentes, abra um chamado para correção de dados cadastrais e ajuste o gestor responsável antes de continuar.</li>
    </ul>
  </li>
  <br />
  <li><strong>Acesse o sistema SAP no ambiente 06 (SAP Solution Manager):</strong>
    <ul>
      <li>Digite a transação “SU01” e pressione "Enter".</li>
      <li>Clique no matchcode e informe o nome do usuário.</li>
      <li>Selecione o usuário e clique para desbloqueá-lo.</li>
      <li>Informe o número do chamado e clique em "Enter".</li>
    </ul>
  </li>
  <br />
  <li><strong>Acesse o SAP Portal no ambiente desejado:</strong>
    <ul>
      <li>Entre no ambiente (produção, desenvolvimento ou qualidade) e faça login.</li>
      <li>Selecione a aba “Administração de Usuário” e informe o usuário para desbloqueio.</li>
      <li>Na aba “Informações sobre a conta”, certifique-se de que o campo “Senha bloqueada” está selecionado.</li>
      <li>Clique em “Modificar” para desbloquear.</li>
    </ul>
  </li>
  <br />
  <li><strong>Redefina a senha, se necessário:</strong>
    <ul>
      <li>Na aba “Informações gerais”, insira a nova senha nos campos “Definir senha” e “Confirmar senha”.</li>
      <li>Clique em “Gravar” e certifique-se de que o campo “Senha bloqueada” não está mais selecionado.</li>
    </ul>
  </li>
</ol>
<br />
<p>Espero que isso ajude! Se precisar de mais alguma coisa, estou à disposição.</p>

        </div>)
      },
      greeting: {
        keywords: ['olá'],
        response: <span>Olá! Como posso ajudar você hoje?</span>
      },
      whoAmI: {
        keywords: ['quem é você'],
        response: <span>Eu sou o chatbot da Catech, estou aqui para te ajudar.</span>
      },
      help: {
        keywords: ['ajuda'],
        response: <span>Claro, estou aqui para ajudar! O que você precisa saber?</span>
      }
    };

    const lowerCaseMessage = userMessage.toLowerCase();

    for (const key in responses) {
      const { keywords, response } = responses[key];
      if (keywords.every(keyword => lowerCaseMessage.includes(keyword))) {
        return response;
      }
    }

    return 'Desculpe, não entendi sua pergunta.';
  };

  const handleSendMessageFirst = () => {
    setIsFirst(true);

    const botMessage = 'Olá! Como posso ajudar você hoje?';

    const newMessages = [{ text: botMessage, isUserMessage: false, timestamp: new Date() }, ...messages];
    setMessages(newMessages);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1028) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`font-inter flex flex-col items-center w-full bg-custom-gradien ${!isMobile ? 'min-h-screen' : 'h-[calc(100vh-4.5rem)]'}`}>
      <div className={`flex flex-col-reverse text-[#E3E3E3] p-4 w-full max-w-[57rem] mx-auto ${!isMobile ? 'h-[90vh]' : 'h-[calc(91vh-4.5rem)]'}`}>
        <div className="flex flex-col-reverse overflow-y-auto h-full scrollbar-thin scrollbar-thumb-rounded-lg pr-4">
          {messages.map((message, index) => (
            <Message key={index} text={message.text} isUserMessage={message.isUserMessage} image={message.image} timestamp={message.timestamp} />
          ))}
          {!firstMessage && (
            <div className="w-full pl-5">
              <Link to='/faq'>
                <div className="border-gradient-chatbot border rounded-lg mb-4 border-gradient-chatbot-hover hover:text-white">
                  <div className="py-3.5 px-4">
                    <h3 className="font-bold text-xl mb-1">Chamados frequentes e suas soluções</h3>
                    <p className="text-sm">Navegue pelos chamados que mais acontecem com soluções e comentários de outros colaboradores.</p>
                  </div>
                </div>
              </Link>

              <Link to='/previous-calls'>
                <div className="border-gradient-chatbot rounded-lg mb-4 border-4 bg-[#1a1a1a] border-gradient-chatbot-hover hover:text-white">
                  <div className="py-3.5 px-4">
                    <h3 className="font-bold text-xl mb-1">Verificar histórico de chamados</h3>
                    <p className="text-sm">Navegue pelos seus chamados anteriores e em andamento.</p>
                  </div>
                </div>
              </Link>

              <div onClick={handleSendMessageFirst} className="border-gradient-chatbot cursor-pointer border rounded-lg bg-[#1a1a1a] flex justify-between items-center border-gradient-chatbot-hover hover:text-white">
                <div className="py-3.5 px-4">
                  <h3 className="font-bold text-xl mb-1">Iniciar chat com a Catty</h3>
                  <p className="text-sm">Mande sua dúvida para que a Catty possa te ajudar!</p>
                </div>
                <img src={CattyHi} alt="Catty" className="w-16 h-14 mr-4" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center w-full max-w-4xl mx-auto mt-4 pl-2 pr-2">
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          className="mr-2 rounded-full focus:outline-none"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <img src={AnexoIcon} alt="Anexar" className="w-9 h-9" />
        </button>
        <input
          type="text"
          className="flex-grow p-2 px-5 bg-[#2a2a2a] text-white rounded-2xl focus:outline-none border-[0.1px] border-stone-600"
          placeholder="Digite sua mensagem..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="ml-2 rounded-full focus:outline-none"
          onClick={handleSendMessage}
        >
          <img src={EnviarIcon} alt="Enviar" className="w-9 h-9" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
