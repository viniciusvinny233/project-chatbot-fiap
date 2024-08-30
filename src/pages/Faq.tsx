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
      answer: `Esta instrução de trabalho descreve a execução das atividades de remoção de acesso dos colaboradores na ferramenta SISTEMA Y.`,
      description:      (<>
        <p className="mt-2">
          <strong>Pré-requisitos Mínimos de Acesso ao SISTEMA Y:</strong>
        </p>
        <ul className="list-disc list-inside">
          <li>Equipamento (Desktop ou Notebook) devidamente configurado com acesso à internet e pacote Office;</li>
          <li>Acesso à ferramenta Microsoft Dynamics CRM 365 Completo (perfil Administrador de Sistema);</li>
          <li>Nome do Usuário dos aplicativos que serão removidos;</li>
          <li>Unidade de Negócio em que o usuário será alocado caso a remoção seja parcial.</li>
        </ul>
        <br></br>
        <strong>Revisão Semestral de Acessos:</strong>
        <ul className="list-disc list-inside">
          <li>Regularmente, os acessos ao Sistema deverão ser revisados pelo Gestor do time de GQ-Digital.</li>
          <li>A lista de acessos ativos no sistema será gerada pelo time de Digital - Acessos.</li>
          <li>A lista deve ser respondida pelo Gestor de Negócio validando a lista ativa ou informando quais inativações deverão ser realizadas.</li>
          <li>O time de Digital - Acessos registrará as alterações a partir de chamados no Sistema de ITSM de Digital em nome do Gestor de GQ-Digital.</li>
          <li>O time de Digital - Acessos executará a atualização e finalizará o chamado com status de resolvido.</li>
        </ul>
        <br></br>
        <strong>Referências</strong>
        <p>Não há.</p>
        <br></br>
        <strong>Descrição das Atividades:</strong>
        <p>Para remoção de acesso ao APLICATIVO de Artes:</p>
        <p>No <strong>SISTEMA Y</strong> (SISTEMA Y -&gt; Configurações -&gt; Segurança -&gt; Usuários) selecione o usuário e retire <strong>TODOS</strong> os direitos de Acesso da lista clicando em ‘Gerenciar Funções’:</p>
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
        <br></br>
        <p><strong>NOTAS:</strong></p>
        <ul>
          <li>Caso a remoção de acesso seja <strong>PARCIAL</strong>, ou seja, o usuário terá acesso a outros Aplicativos, deve-se adotar o procedimento descrito pelos Aplicativos mantidos para realocar à nova Unidade de Negócio.</li>
          <li>Caso a remoção de acesso seja <strong>TOTAL</strong>, deve-se:</li>
          <ol className="list-disc list-inside">
            <li>Retirar o direito de acesso “Colaboração” ao usuário no Sharepoint Online para os sites correspondentes.</li>
            <li>Retirar ou Revisar a Licença aos Produtos no Centro de Administração do Office 365.</li>
          </ol>
        </ul>
        <br></br>
        <strong>Anexos</strong>
        <p>Sem anexo.</p>
      </>
    ),
    },
    {
      question: "Atualizar dados da BU",
      answer: `Quando um colaborador DA EMPRESA X entrar em contato comunicado que agora seu e-mail deixará de ser DA EMPRESA X e se tornará DA EMPRESA X ou DA EMPRESA X(por exemplo). O analista N1 deve realizar as orientações descritas nessa IT.`,
      description: (<>
        <strong>Revisão Semestral de Acessos</strong>
        <p>Regularmente, os acessos ao Sistema deverão ser revisados pelo Gestor do time de GQ-Digital.</p>
        <br></br>
        <ul className="list-disc list-inside">
          <li>A lista de acessos ativos no sistema será gerada pelo time de Digital - Acessos.</li>
          <li>A lista deve ser respondida pelo Gestor de Negócio validando a lista ativa ou informando quais inativações deverão ser realizadas.</li>
          <li>O time de Digital - Acessos registrará as alterações a partir de chamados no Sistema de ITSM de Digital em nome do Gestor de GQ-Digital.</li>
          <li>O time de Digital - Acessos executará a atualização e finalizará o chamado com status de resolvido.</li>
        </ul>
        <br></br>
        <strong>Referências</strong>
        <p>Palavras chaves: domínio e-mail. ZBO103 AD mudança no domínio.</p>
        <br></br>
        <strong>Descrição</strong>
        <p><strong>N1-Outros:</strong> em posse dos requisitos, realiza a troca do E-mail na ZBO103 no campo E-mail.</p>
        <br></br>
        <ul className="list-disc list-inside">
          <li><strong>1:</strong> Inicia a edição.</li>
          <li><strong>2:</strong> Edita o campo e-mail.</li>
          <li><strong>3:</strong> Preenche o campo motivo com o número do chamado e no campo Nr chamado colocar apenas o número da TASK.</li>
          <li><strong>4:</strong> Após alterado e colocado os dados, precisa gravar como apontado abaixo.</li>
          <li><strong>5:</strong> Evidencia a alteração na ZBO103 e AD dos campos de Email (General e Account) no chamado.</li>
        </ul>
        <br></br>
        <strong>Requisito da atividade:</strong>
        <p><strong>Aval gerencial</strong></p>
        <br></br>
        <strong>Motivo:</strong>
        <ul className="list-disc list-inside">
          <li>De: user@xxxxxxxxx.com.br</li>
          <li>Para: user@yyyyyyyyyy.com.br</li>
        </ul>
        <br></br>
        <strong>Obs:</strong>
        <p>Antes de concluir esse 1° chamado, abra um novo chamado e com as mesmas evidências e aval, envie para a Equipe X para que realizem a alteração do novo e-mail no AD e informe o número desse 2° chamado no 1° chamado aberto para o concluir corretamente.</p>
        <br></br>
        <strong>Anexos</strong>
        <p>Sem anexos.</p>
      </>)
    },
    {
      question: "Desbloqueio de Usuário",
      answer: `Esta instrução de trabalho tem como objetivo orientar os analistas no processo de desbloqueio de usuário no sistema SAP e Portal SAP.`,
      description: (<>
      <strong>Pré-requisitos:</strong>
      <ul className="list-disc list-inside">
        <li>Nome completo do usuário;</li>
        <li>Login do usuário nos sistemas SAP e Portal SAP;</li>
        <li>Acesso ao SAP Solution Manager;</li>
        <li>Acesso ao Portal SAP;</li>
        <li>Chamado deve ser solicitado/registrado pelo próprio usuário ou pelo gestor imediato.</li>
      </ul>
      <br></br>

      <strong>Revisão Semestral de Acessos</strong>
      <p>Regularmente os acessos ao Sistema deverão ser revisados pelo Gestor do time de GQ-Digital.</p>
      <br></br>
      <ul className="list-disc list-inside">
        <li>A lista de acessos ativos no sistema será gerada pelo time de Digital - Acessos.</li>
        <li>A lista deve ser respondida pelo Gestor de Negócio validando a lista ativa ou informando quais inativações deverão ser realizadas.</li>
        <li>O time de Digital - Acessos registrará as alterações a partir de chamados no Sistema de ITSM de Digital em nome do Gestor de GQ-Digital.</li>
        <li>O time de Digital - Acessos executará a atualização e finalizará o chamado com status de resolvido.</li>
      </ul>
      <br></br>

      <strong>Referências</strong>
      <p>Não há referências.</p>
      <br></br>

      <strong>Descrição das Atividades</strong>
      <p>Para desbloquear acesso do usuário no sistema SAP e Portal SAP siga os passos abaixo:</p>
      <br></br>

      <p><strong>Para usuários terceiros:</strong> Caso a solicitação seja registrada pelo gestor imediato, é necessário seguir os passos abaixo:</p>
      <ul className="list-disc list-inside">
        <li>Realize a comparação do gestor que respondeu o e-mail com o gestor cadastrado na transação ZBO103 e siga as orientações abaixo:</li>
        <ul className="list-disc list-inside">
          <li>Caso seja o mesmo gestor, prossiga com o passo 3.2.</li>
          <li>Caso sejam gestores diferentes, faça:</li>
          <ul className="list-disc list-inside">
            <li>Abra chamado relacionado para correção de dados cadastrais.</li>
            <li>Realize a alteração do gestor responsável pela abertura do chamado.</li>
            <li>Prossiga o atendimento da solicitação conforme passo 3.2.</li>
          </ul>
        </ul>
      </ul>
      <p><strong>Observação:</strong> Deve ser considerado Gestor imediato para terceiro: Coordenador, Gerente e Diretor.</p>
      <br></br>

      <p><strong>Acesse o sistema SAP no ambiente 06 - SAP Solution Manager:</strong></p>
      <ul className="list-disc list-inside">
        <li>Digite a transação “SU01” e tecle “Enter”.</li>
        <li>Clique no matchcode.</li>
        <li>Informe o nome do usuário e clique no botão ou tecle “Enter” para realizar a busca.</li>
        <li>Selecione o usuário e clique no botão ou tecle “Enter”.</li>
        <li>Em seguida, clique no botão para realizar o desbloqueio.</li>
        <li>Clique no botão.</li>
        <li>Informe o número do chamado e clique em ou tecle “Enter”.</li>
        <li>Para desbloquear acesso no SAP Portal, é necessário acessar o endereço do ambiente desejado, informar usuário e senha e clicar em “Logon”.</li>
      </ul>
      <br></br>

      <p><strong>Endereços do SAP Portal:</strong></p>
      <ul className="list-disc list-inside">
        <li>Ambiente de Produção: https://xxxxxxxxxxxxxx</li>
        <li>Ambiente de Desenvolvimento: https://xxxxxxxxxxxxxx</li>
        <li>Ambiente de Qualidade: https://xxxxxxxxxxxxxx</li>
      </ul>
      <br></br>

      <p>Selecione a aba “Administração de Usuário”, informe o usuário que deseja realizar o desbloqueio e tecle “Enter”.</p>
      <br></br>

      <p><strong>Selecione o usuário em “Detalhes para Usuário”:</strong> Clique na aba “Informações sobre a conta” e certifique-se de que o campo “Senha bloqueada” está selecionado. Clique em “Modificar”.</p>
      <br></br>

      <p>Clique na aba “Informações gerais”, informe a senha nos campos “Definir senha” e “Confirmar senha” e clique em “Gravar”. Certifique-se de que o campo “Senha bloqueada” na aba “Informações sobre a conta” não está selecionado.</p>
      <br></br>

      <strong>Anexos</strong>
      <p>Não há anexos.</p>
      </>)
    },
    {
      question: "Reset de Senha",
      answer: `Esta instrução de trabalho tem como objetivo orientar os analistas no processo de alteração de senha do usuário nos sistemas SAP e Portal SAP.`,
      description: (<>
      <strong>Pré-requisitos:</strong>
      <ul className="list-disc list-inside">
        <li>Nome completo do usuário;</li>
        <li>Login do usuário nos sistemas SAP e Portal SAP;</li>
        <li>Acesso ao SAP Solution Manager;</li>
        <li>Acesso ao Portal SAP;</li>
        <li>Chamado deve ser solicitado/registrado pelo próprio usuário ou pelo gestor imediato.</li>
      </ul>
      <br></br>

      <strong>Revisão Semestral de Acessos</strong>
      <p>Regularmente, os acessos ao Sistema deverão ser revisados pelo Gestor do time de GQ-Digital.</p>
      <br></br>
      <ul className="list-disc list-inside">
        <li>A lista de acessos ativos no sistema será gerada pelo time de Digital - Acessos.</li>
        <li>A lista deve ser respondida pelo Gestor de Negócio validando a lista ativa ou informando quais inativações deverão ser realizadas.</li>
        <li>O time de Digital - Acessos registrará as alterações a partir de chamados no Sistema de ITSM de Digital em nome do Gestor de GQ-Digital.</li>
        <li>O time de Digital - Acessos executará a atualização e finalizará o chamado com status de resolvido.</li>
      </ul>
      <br></br>

      <strong>Referências</strong>
      <p>Não há referências.</p>
      <br></br>

      <strong>Descrição das Atividades</strong>
      <p>Para alterar a senha do usuário no sistema Portal SAP, siga os passos abaixo:</p>
      <br></br>

      <p><strong>-</strong> Para realizar a alteração de senha do usuário no SAP Portal, é necessário acessar o endereço do ambiente desejado, informar usuário e senha, e clicar em “Logon”:</p>
      <br></br>

      <p><strong>1. Endereços do SAP Portal:</strong></p>
      <ul className="list-disc list-inside">
        <li>Ambiente de Produção: https://xxxxxxxxxxxxxxxxxxxxxx</li>
        <li>Ambiente de Desenvolvimento: https://xxxxxxxxxxxxxxxxxxxxxx</li>
        <li>Ambiente de Qualidade: https://xxxxxxxxxxxxxxxxxxxxxx</li>
      </ul>
      <br></br>

      <p><strong>2.</strong> Selecione a aba “Administração de Usuário”, informe o usuário que deseja realizar a alteração de senha, tecle “Enter”, selecione o usuário e clique em “Modificar”.</p>
      <br></br>

      <p><strong>3.</strong> Na aba “Informações Gerais”, altere a senha através dos campos “Definir Senha” e “Confirmar Senha”. Em seguida, clique em “Gravar”.</p>
      <br></br>

      <strong>Anexo</strong>
      <p>N/A</p>
      </>)
    },
    {
      question: "Alteração de Acessos",
      answer: `Esta Instrução de Trabalho visa orientar na atividade de alteração de acesso do usuário no sistema SISTEMA Y.`,
      description: (<>
      <strong>1. Pré-requisitos</strong>
      <ul className="list-disc list-inside">
        <li>Ter acesso ao sistema SISTEMA Y com permissão para alterar acesso.</li>
        <li>Nome completo do usuário;</li>
        <li>Tipo da alteração de acesso (Perfil);</li>
        <li>O chamado deverá ser aberto ou possuir anexo de autorização das colaboradoras:</li>
      </ul>
      <p><strong>Obs.:</strong> Caso o usuário seja da localidade Anápolis/Brainfarma, será válido o aval da documentação técnica.</p>
      <br></br>

      <strong>Revisão Semestral de Acessos</strong>
      <p>Regularmente, os acessos ao Sistema deverão ser revisados pelo Gestor do time de GQ-Digital.</p>
      <br></br>
      <ul className="list-disc list-inside">
        <li>A lista de acessos ativos no sistema será gerada pelo time de Digital - Acessos.</li>
        <li>A lista deve ser respondida pelo Gestor de Negócio validando a lista ativa ou informando quais inativações deverão ser realizadas.</li>
        <li>O time de Digital - Acessos registrará as alterações a partir de chamados no Sistema de ITSM de Digital em nome do Gestor de GQ-Digital.</li>
        <li>O time de Digital - Acessos executará a atualização e finalizará o chamado com status de resolvido.</li>
      </ul>
      <br></br>

      <strong>Referências</strong>
      <p>Não há referências.</p>
      <br></br>

      <strong>Descrição das Atividades</strong>
      <p><strong>1.</strong> Para alterar acessos de usuários no sistema SISTEMA Y, acesse o sistema no link:<br></br>
      <a href="http://xxxxxxxxxxxxxxxx">http://xxxxxxxxxxxxxxxx</a></p>
      <br></br>

      <ul className="list-disc list-inside">
        <li><strong>1.1.</strong> Logar no sistema com seu “Login” e “Senha”, depois clique em “Enviar”.</li>
        <li><strong>1.2.</strong> No menu “Administração” escolher a opção “Controle de Acesso”.</li>
        <li><strong>1.3.</strong> No menu “Controle” clique na opção “Usuário”.</li>
        <li><strong>1.4.</strong> Em “Lista de Usuários” inserir o nome completo do usuário que necessita alterar o tipo de acesso e clicar em Listar, em seguida clicar no nome do mesmo.</li>
        <li><strong>1.5.</strong> Com o cadastro do usuário aberto, clique em “Ação &gt; Editar Usuário”.</li>
        <li><strong>1.6.</strong> Em seguida, clique em “Pertence aos grupos”, onde abrirá a janela “Lista de grupos” para marcar o grupo ao qual o usuário pertencerá.</li>
        <li><strong>1.7.</strong> Após, clique em “Atribuições”, onde abrirá a janela “Lista de Atribuições” para selecionar o acesso que o usuário terá.</li>
        <li><strong>1.8.</strong> Com o acesso do usuário alterado, clique em “Ação &gt; Salvar Usuário”.</li>
      </ul>
      <br></br>

      <strong>Anexos</strong>
      <p>Não há anexos.</p>
      </>)
    },
    {
      question: "Alterar Perfil de Acesso ",
      answer: `Esta instrução de trabalho orienta o passo a passo para atribuição de grupos de acesso ao SISTEMA Y, para a atribuição do mesmo é necessário que os seguintes questionamentos tenham sido respondidos via chamado. Com autorização gerencial em anexo.`,
      description: (<>
      <strong>1. Introdução / Pré-requisitos para execução da IT</strong>
      <p>Esta instrução de trabalho orienta o passo a passo para atribuição de grupos de acesso ao SISTEMA Y. Para a atribuição do mesmo, é necessário que os seguintes questionamentos tenham sido respondidos via chamado, com autorização gerencial em anexo.</p>
      <br></br>

      <strong>1.1 Pré-requisitos</strong>
      <ul className="list-disc list-inside">
        <li>Nome do colaborador;</li>
        <li>Usuário do Sistema SISTEMA Y;</li>
        <li>Motivo da alteração do perfil;</li>
        <li>Tipo e Grupo de acesso ou usuário cópia;</li>
        <li>Autorização gerencial.</li>
      </ul>
      <br></br>

      <strong>Revisão Semestral de Acessos</strong>
      <p>Regularmente, os acessos ao Sistema deverão ser revisados pelo Gestor do time de GQ-Digital.</p>
      <br></br>
      <ul className="list-disc list-inside">
        <li>A lista de acessos ativos no sistema será gerada pelo time de Digital - Acessos.</li>
        <li>A lista deve ser respondida pelo Gestor de Negócio validando a lista ativa ou informando quais inativações deverão ser realizadas.</li>
        <li>O time de Digital - Acessos registrará as alterações a partir de chamados no Sistema de ITSM de Digital em nome do Gestor de GQ-Digital.</li>
        <li>O time de Digital - Acessos executará a atualização e finalizará o chamado com status de resolvido.</li>
      </ul>
      <br></br>

      <strong>2. Referências</strong>
      <p>Não há referências.</p>
      <br></br>

      <strong>3. Descrição das Atividades</strong>
      <p><strong>3.1 Atribuir perfil de acesso ao SISTEMA Y</strong><br></br>
      Após o usuário estar criado, é necessário que o mesmo seja atribuído a um perfil de acesso. Siga os passos abaixo.</p>
      <br></br>
      <ul className="list-disc list-inside">
        <li>Clique em "Users" e todos os usuários cadastrados no sistema serão exibidos.</li>
      </ul>
      <p><strong>Obs.:</strong> Existem três grupos de usuários: Ativos, Inativos ou Removidos.</p>
      <ul className="list-disc list-inside">
        <li><strong>Ativos (Active):</strong> São usuários ativos no sistema. É possível acesso ao sistema de acordo com o seu nível de permissão de acesso e grupo de acesso atribuído.</li>
        <li><strong>Inativos (Disable):</strong> São usuários inativos no sistema, não sendo possível a sua conexão no sistema, independentemente do nível de acesso ou grupo atribuído.</li>
        <p><strong>Obs.:</strong> O status Inativo é utilizado em caso de férias ou ausência do usuário por um período X de dias. Neste cenário, somente o usuário solicitará sua reativação.</p>
        <li><strong>Removidos (Removed):</strong> São usuários removidos do sistema, não sendo possível a sua conexão no sistema, independentemente do nível de acesso ou grupo atribuído.</li>
        <p><strong>Obs.:</strong> Esta opção é utilizada para colaboradores que foram desligados da companhia ou que não utilizarão o Empower em suas atividades.</p>
      </ul>
      <p>O perfil de acesso deve ser o mesmo em “Allowed User Types” e “Default User Type”.</p>
      <br></br>
      <p>Como próximo passo, marque o checkbox "Password Required".</p>
      <br></br>
      <p>Em Default User Interface, selecione a opção “Pro”.</p>
      <br></br>
      <p>Nos checkboxes da caixa “Allowed Interfaces”</p>
      <ul className="list-disc list-inside">
        <li>Deixe marcado somente “Pro Interfaces”.</li>
      </ul>
      <br></br>
      <p>Recapitulando, após todas as configurações, a tela deve ser idêntica à tela abaixo. Somente os campos User Name, Full Name, Allowed User Types e Default User Types devem ser modificados de acordo com os requisitos que foram enviados pelo usuário.</p>
      <br></br>

      <strong>Anexos</strong>
      <p>Não há anexos.</p>
      </>)
    },
    {
      question: "Manutenção de Perfil no SISTEMA Y",
      answer: `Este documento estabelece o procedimento para os analistas de Acesso criar, alterar e/ou modificar Perfil e Funções no SISTEMA Y (SISTEMA Y e Pagamento aos Distribuidores e Redes) que podem ser acessados através do endereço do ambiente de produção https://xxxxxxxxxxxxxxxx`,
      description: (<>
      <p>Para os demais ambientes, os endereços são:</p>
      <ul className="list-disc list-inside">
        <li>DEV: <a href="https://xxxxxxxxxxxxxxxx">https://xxxxxxxxxxxxxxxx</a></li>
        <li>QAS: <a href="https://xxxxxxxxxxxxxxxx">https://xxxxxxxxxxxxxxxx</a></li>
      </ul>
      <br></br>

      <strong>Pré-requisitos:</strong>
      <ul className="list-disc list-inside">
        <li>O usuário precisa estar cadastrado no AD.</li>
        <li>O acesso ao sistema Web poderá ser pelo Google Chrome e Internet Explorer (IE).</li>
      </ul>
      <p>Ter e-mail de autorização da responsável pelo negócio, que atualmente é a XXXX. Na sua ausência, a responsável será a XXXX.</p>
      <br></br>

      <strong>Revisão Semestral de Acessos</strong>
      <p>Regularmente, os acessos ao Sistema deverão ser revisados pelo Gestor do time de GQ-Digital.</p>
      <br></br>
      <ul className="list-disc list-inside">
        <li>A lista de acessos ativos no sistema será gerada pelo time de Digital - Acessos.</li>
        <li>A lista deve ser respondida pelo Gestor de Negócio validando a lista ativa ou informando quais inativações deverão ser realizadas.</li>
        <li>O time de Digital - Acessos registrará as alterações a partir de chamados no Sistema de ITSM de Digital em nome do Gestor de GQ-Digital.</li>
        <li>O time de Digital - Acessos executará a atualização e finalizará o chamado com status de resolvido.</li>
      </ul>
      <br></br>

      <strong>Referências</strong>
      <p>Não há referências.</p>
      <br></br>

      <strong>Descrição das Atividades</strong>
      <br></br>

      <strong>Perfil</strong>
      <p>Tela para cadastrar perfis.</p>
      <ul className="list-disc list-inside">
        <li><strong>Descrição:</strong> informar o perfil.</li>
      </ul>
      <p>Após o perfil informado, para gravar, clicar em [botão].</p>
      <p><strong>Observação:</strong> Todo registro criado é gravado com o status Ativo.</p>
      <p>Além das funcionalidades de excluir e editar, existe a funcionalidade de alterar status. Uma vez clicado nesta opção, o sistema abrirá um pop-up informando se realmente deseja alterar o status. Se clicar em [botão], o sistema alterará o status do perfil. Se estiver ativo, desativará, e se estiver desativado, ativará.</p>
      <br></br>

      <p><strong>Exemplo:</strong></p>
      <p>O perfil Administrador está ativo. Clicando em [botão], aparecerá a seguinte mensagem:</p>
      <p>[mensagem]</p>
      <p>Ao clicar em [botão], o sistema alterará o status.</p>
      <p>Na funcionalidade excluir, caso o perfil já esteja associado a uma função e usuário, o sistema não permitirá a exclusão, exibindo a seguinte mensagem de erro:</p>
      <br></br>

      <strong>Função</strong>
      <p><strong>NOTA:</strong> O Cadastro de função será realizado pela equipe de Web. A associação da função ao perfil é de responsabilidade da equipe de Acesso.</p>
      <p>Tela para cadastrar funções.</p>
      <p>Para adicionar uma nova função, clicar em [botão].</p>
      <ul className="list-disc list-inside">
        <li><strong>Código:</strong> informar um código. Nesse campo deve ser informado um objeto de desenvolvimento. Para o nome do código, seguem as recomendações dadas pelo fornecedor.</li>
        <li><strong>Descrição:</strong> informar uma descrição da função.</li>
      </ul>
      <p>Para gravar os dados informados, clicar em [botão].</p>
      <p><strong>Observação:</strong> Todo registro criado é gravado com o status Ativo.</p>
      <p>Além das funcionalidades de excluir e editar, existe a funcionalidade de alterar status. Uma vez clicado nesta opção, o sistema abrirá um pop-up informando se realmente deseja alterar o status. Se clicar em [botão], o sistema alterará o status do perfil. Se estiver ativo, desativará, e se estiver desativado, ativará.</p>
      <br></br>

      <p><strong>Exemplo:</strong></p>
      <p>A função pgnAgrpLinhaProduto está ativa. Clicando em [botão], aparecerá a seguinte mensagem:</p>
      <p>[mensagem]</p>
      <p>Na funcionalidade excluir, caso a função já esteja associada a um perfil, o sistema não permitirá a exclusão, exibindo a seguinte mensagem de erro:</p>
      <br></br>

      <strong>Anexos</strong>
      <p>Não há anexos.</p>

      </>)
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center max-h-screen bg-[#1a1a1a] text-white p-4 md:p-13 bg-custom-gradient">
      <div className="w-full max-w-7xl">
        <div className='justify-center md:flex-row md:justify-between items-center'>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text mt-2 md:text-center text-center md:mt-3">CHAMADOS FREQUENTES</h1>
          <p className="mt-2 text-gray-400 w-full  text-center">
            Caso sua dúvida não esteja aqui é só chamar nosso chatbot, Catty.
          </p>
          <div className="flex items-center justify-center  mb-12 relative">
            <input 
            type="text" 
            placeholder="Buscar um chamado ou assunto"
            className="mt-4 p-3 bg-[#222222] rounded-md md:w-80 border min-w-64 border-[#363636] focus:outline-none focus:bg-[#1a1a1a] "/>
          </div>
        </div>

        <div className="mt-8 max-h-[36rem] md:max-h-[42rem] overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-[#77C1C6] scrollbar-track-[#2a2a2a] pr-4 font-inter">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-[#2a2a2a] rounded-xl shadow-md cursor-pointer" onClick={() => toggleExpand(index)}>
              <h3 className="text-xl font-bold mb-2 flex justify-between">
                {faq.question}
                <span className={`transform transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}>
                  <img src={SetaBaixo} alt="Expandir" className="w-5 h-5" />
                </span>
              </h3>
              <p className="text-gray-300 mb-4">{faq.answer}</p>
              {expandedIndex === index && (
                <div>
                  <p className="text-gray-300 mb-4">{faq.description}</p>
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
