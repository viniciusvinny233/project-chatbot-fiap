import { Link } from 'react-router-dom';
import { containerConstants, teamMembers } from "../assets/home/constants";
import logosCatech from "../assets/home/images/LogosChallenge.png";
import heroSectionImg from "../assets/home/images/HeroSectionImg.png";
import firstSectionBgImg from "../assets/home/images/firstSectionBgImg.png";
import logosCatechBlack from "../assets/home/images/LogosChallengeBlack.png";
import sixthContainerFirstSectionBg from "../assets/home/images/sixthSectionFirstContainerBg.webp";
import sixthContainerSecondSectionBg from "../assets/home/images/sixthSectionSecondContainerBg.webp";
import sixthContainerSecondSectionImg from "../assets/home/images/fifthSectionSecondContainerImg.png";
import sixthContainerFirstSectionImg from "../assets/home/images/firstContainerFifthSection.png";
import github from "../assets/home/images/GitHub.png"
import linkedin from "../assets/home/images/LinkedIn.png"

const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const ButtonLink: React.FC<{ to: string, text: string }> = ({ to, text }) => (
  <Link to={to}>
    <div className="bg-[#BFF3FF] py-1.5 px-4 rounded-full flex items-center text-black font-semibold shadow-shape gap-1">
      {text}
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
        className="lucide lucide-arrow-up-right w-4"
      >
        <path d="M7 7h10v10"/>
        <path d="M7 17 17 7"/>
      </svg>
    </div>
  </Link>
);

const TextLink: React.FC<{ href: string, text: string }> = ({ href, text }) => (
  <a href={href} onClick={(e) => {
    e.preventDefault();
    scrollToSection('about');
  }}>
    <div className="flex items-center py-1 text-[#DFDFDF] space-x-1 cursor-pointer">
      <span>{text}</span>
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
        className="lucide lucide-chevron-down w-4"
      >
        <path d="m6 9 6 6 6-6"/>
      </svg>
    </div>
  </a>
);

const Home: React.FC = () => {
  return (
    <div className="font-inter antialiased flex flex-col justify-center items-center text-center">
      <img src={logosCatech} alt="Logos Fiap, Softtek e Catech" className="w-40 mt-11 md:mt-16" />
      <div className="px-7 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-7xl text-[#BFDDDF] leading-7 pt-4 md:pt-7">
          Bem vindo à{" "}
          <span className="bg-gradient-to-r font-semibold from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text">Catech</span>!
          <br />
          Como posso ajudar você?
        </h1>
        <p className="text-[#ADADAD] font-light text-sm md:text-base pt-4 max-w-[30rem]">
          Seu assistente técnico inteligente desenvolvido para oferecer suporte de forma amigável e eficiente.
        </p>
      </div>
      <div id="buttons" className="text-sm md:text-base my-6 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 justify-center items-center">
        <ButtonLink to="/chatbot" text="Visitar a aplicação" />
        <TextLink href="#about" text="Sobre a Catech"/>
      </div>
      <img src={heroSectionImg} alt="Imagem de um computador com uma página da Catty sendo utilizada" className="max-h-[800px]"/>
      <div className="mt-16 md:mt-32 px-7 flex flex-col justify-center items-center" id="about">
        <h2 className="text-3xl md:text-6xl text-[#BFDDDF] leading-8 pt-4 md:pt-7">
          Qual a origem da <span className="bg-gradient-to-r font-bold from-[#82E0F5] to-[#E27696] text-transparent bg-clip-text">Catech</span>?
        </h2>
        <p className="text-[#CFCFCF] text-sm md:text-base max-w-[60rem] pt-3">
          A Catech foi desenvolvida como parte de um desafio da Softtek para a turma do segundo ano de Engenharia de Software da FIAP, visando aprimorar a eficiência no suporte técnico com a criação de um robô assistente integrado a tecnologias avançadas.
        </p>
        <div className="relative mt-9 rounded-2xl overflow-hidden md:max-w-6xl lg:mx-12">
          <img src={firstSectionBgImg} alt="" className="h-[300px] sm:h-full object-cover w-full"/>
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <h3 className="text-[#222222] font-bold text-base md:text-xl xl:text-2xl leading-4 text-center px-6">
              Conheça um pouco sobre nós pelo olhar da nossa robô, Catty
            </h3>
            <div className="w-full flex justify-center">
              <iframe
                className="w-3/4  sm:h-64 md:h-80 lg:h-96 xl:h-[480px] rounded-lg shadow-shape"
                src="https://www.youtube.com/embed/gD09yEANSOw?si=aHdWPXAzvZlWuWXk&controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>


            <img src={logosCatechBlack} alt="Logos Catech em preto" className="w-40"/>
          </div>
        </div>
      </div>
      {containerConstants.map((container, index) => (
        <div key={index} className="mt-12 md:mt-16 px-7 flex flex-col justify-center items-center">
          <h2 className="text-3xl md:text-6xl text-[#BFDDDF] leading-8 pt-4 md:pt-7 max-w-[60rem] text-balance">
            {container.title}
          </h2>
          <p className="text-[#CFCFCF] text-sm md:text-base max-w-[60rem] pt-3">
            {container.desc}
          </p>
          <div className="relative mt-8 rounded-2xl overflow-hidden md:max-w-6xl lg:mx-12">
            <img src={container.bgImg} alt="" className="h-[440px] sm:h-full object-cover w-full shadow-shape"/>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <video src={container.containerVideo} autoPlay loop muted className="hidden sm:flex sm:w-5/6 lg:w-4/5 rounded-xl "/>
              <video src={container.mobileContainerVideo} autoPlay loop muted className="sm:hidden rounded-xl w-3/4"/>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-12 md:mt-16 flex flex-col items-center px-8">
        <h2 className="text-3xl md:text-6xl text-[#BFDDDF] leading-8 pt-4 md:pt-7 max-w-[60rem]">
          Vá além como administrador
        </h2>
        {/* Primeira Seção */}
        <section className="mt-7 text-start flex flex-col sm:flex-row max-w-[1129px]">
          <div className="shadow-shape border border-[#5B5B5B] rounded-t-2xl px-6 py-5 sm:px-14 sm:py-11 h-[17rem] sm:w-1/2 sm:h-[380px] sm:rounded-t-none sm:rounded-l-3xl sm:rounded-tl-3xl">
            <h3 className="text-2xl md:text-3xl text-[#BFDDDF] leading-6">
              Visualize todos os chamados e os status de cada assistente técnico
            </h3>
            <p className="text-xs md:text-sm text-[#CFCFCF] mt-3">
              Na página de chamados do administrador, você tem acesso a uma visão geral de todos os assistentes e todos os chamados, inclusive os que já foram resolvidos e os que estão em andamento.
            </p>
          </div>
          <div className="shadow-shape rounded-b-2xl sm:w-1/2 sm:rounded-b-none sm:rounded-r-3xl relative overflow-hidden h-[17rem] sm:h-[380px] border border-[#5B5B5B] sm:border-l-0 ">
            <img 
              src={sixthContainerFirstSectionBg} 
              alt="" 
              className="object-cover h-full w-full rounded-b-2xl sm:h-[380px] sm:rounded-b-none sm:rounded-r-3xl"
            />
            <img 
              src={sixthContainerFirstSectionImg} 
              alt="" 
              className="absolute top-12 left-12 md:top-20 md:left-20 rounded-xl border border-[#5B5B5B] shadow-shape"
              style={{ width: 'auto', height: 'auto', maxWidth: '700px', maxHeight: '420px' }}
            />
          </div>
        </section>
        {/* Segunda Seção */}
        <section className="mt-7 text-start flex flex-col sm:flex-row max-w-[1129px]">
          <div className="shadow-shape border border-[#5B5B5B] rounded-t-2xl px-6 py-5 sm:px-14 sm:py-11 h-[17rem] sm:w-1/2 sm:h-[380px] sm:rounded-t-none sm:rounded-l-3xl sm:rounded-tl-3xl">
            <h3 className="text-2xl md:text-3xl text-[#BFDDDF] leading-6">
              Tenha acesso a relatórios de chamados, produtividade individual e da equipe
            </h3>
            <p className="text-xs md:text-sm text-[#CFCFCF] mt-3">
              Como administrador, você tem a opção dentro da página de chamados de criar um relatório tanto da equipe inteira quanto individualmente. Saiba a produtividade dos assistentes técnicos, os chamados que acontecem com maior frequência e mais dados que se conectam com nossa plataforma.
            </p>
          </div>
          <div className="shadow-shape rounded-b-2xl sm:w-1/2 sm:rounded-b-none sm:rounded-r-3xl relative overflow-hidden h-[17rem] sm:h-[380px] border border-[#5B5B5B] sm:border-l-0">
            <img 
              src={sixthContainerSecondSectionBg} 
              alt="" 
              className="object-cover h-full w-full rounded-b-2xl sm:h-[380px] sm:rounded-b-none sm:rounded-r-3xl"
            />
            <img 
              src={sixthContainerSecondSectionImg} 
              alt="" 
              className="absolute top-12 left-12 md:top-20 md:left-20 rounded-xl border border-[#5B5B5B] shadow-shape"
              style={{ width: 'auto', height: 'auto', maxWidth: '700px', maxHeight: '420px' }}
            />
          </div>
        </section>
      </div>
      <div className="mt-12 md:mt-16 flex flex-col items-center px-8 max-w-[1300px]">
  <h2 className="text-3xl md:text-6xl text-[#BFDDDF] leading-8 pt-4 md:pt-7 max-w-[60rem]">
    Conheça nossa equipe:
  </h2>
  <div className="w-full flex justify-center mt-14 mb-20">
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
      {teamMembers.map((team, index) => (
        <div key={index} className="">
          <img src={team.icon} alt="" className="w-full h-52 object-cover shadow-shape rounded-md "/>
          <div className="flex flex-col items-start min-w-[283px] max-w-[283px] text-[#CFCFCF] mt-3">
          <p className="text-lg font-extrabold leading-tight">{team.role}</p>
          <p className="text-sm">{team.name}</p>
          <div className="flex space-x-2 mt-2">
            <a href={team.linkedin}><img src={linkedin} alt="LinkedIn logo" className="w-5"/></a>
            <a href={team.github}><img src={github} alt="GitHub logo" className="w-5"/></a>
          </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


    </div>
  );
};

export default Home;
