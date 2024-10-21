// homepage container constants
import secondContainerBg from "./images/secondSectionBgImg.png"
import thirdContainerBg from "./images/thirdSectionBgImg.png"
import fourthContainerBg from "./images/fourthSectionBgImg.png"
import fifthContainerBg from "./images/fifthSectionBgImg.png"
import AnaVitoria from "./images/firstCardImg.png"
import MarcosVinicius from "./images/secondCardImg.png"
import MatheusGuedes from "./images/thirdCardImg.png"
import DionisioSantana from "./images/fourthCardImg.png"
import VitorFutida from "./images/fifthCardImg.png"
import overlayVideo from "./videos/overlayVideo.mp4"
import faqVideo from "./videos/faqVideo.mp4"
import previousCallsVideo from "./videos/previousCallsVideo.mp4"
import chatCatty from "./videos/Catty.mp4"
import mobileOverlayVideo from "./videos/mobileOverlayVideo.mp4"
import mobileFaqVideo from "./videos/mobileFaqVideo.mp4"
import mobilePreviousCallsVideo from "./videos/mobilePreviousCallsVideo.mp4"
import mobileCattyVideo from "./videos/mobileCatty.mp4"

interface ContainerConstants {
    title: string;
    desc: string;
    bgImg: string;
    containerVideo: string;
    mobileContainerVideo: string;

}
interface Team {
    role: string,
    name: string
    icon: string;
    linkedin: string;
    github: string;
}

export const containerConstants: ContainerConstants[] = [
    {
        title: "Converse com a Catty de qualquer lugar",
        desc: "No momento, a Catty está disponível apenas na nossa aplicação web. No entanto, já desenvolvemos uma simulação de como ela funcionará no aplicativo desktop, com um overlay que se adapta a qualquer janela em uso, facilitando o suporte em tempo real.",
        bgImg: secondContainerBg,
        containerVideo: overlayVideo,
        mobileContainerVideo: mobileOverlayVideo,
    },
    {
        title: "Acesse chamados resolvidos com facilidade",
        desc: "Explore soluções de chamados anteriores para entender como outros assistentes resolveram problemas similares. Use palavras-chave para encontrar incidentes raros, mas já registrados, agilizando sua rotina de suporte.",
        bgImg: thirdContainerBg,
        containerVideo: faqVideo,
        mobileContainerVideo: mobileFaqVideo,
    },
    {
        title: "Acompanhe seus chamados e os de outros assistentes",
        desc: "Com o perfil de assistente, você pode acompanhar todos os seus chamados, ativos e resolvidos, com detalhes completos, datas, comentários e opções de filtragem para agilizar suas buscas.",
        bgImg: fourthContainerBg,
        containerVideo: previousCallsVideo,
        mobileContainerVideo: mobilePreviousCallsVideo,
    },
    {
        title: "Pratique com a Catty",
        desc: "Peça para a Catty simular clientes com problemas aleatórios ou específicos para melhorar suas habilidades. Você também pode solicitar perguntas desafiadoras para testar e aprimorar seus conhecimentos.",
        bgImg: fifthContainerBg,
        containerVideo: chatCatty,
        mobileContainerVideo: mobileCattyVideo,
    },    
    ];

export const teamMembers: Team [] = [
    {
        role: "Documentação e UX/UI",
        name: "Ana Vitória Baetas da Silva",
        icon: AnaVitoria,
        linkedin: "https://www.linkedin.com/in/anavitoriabaetas/",
        github: "https://github.com/mytkadev"
    },
    {
        role: "Frontend",
        name: "Marcos Vinicius P. Rodrigues ",
        icon: MarcosVinicius,
        linkedin: "https://www.linkedin.com/in/vnxdeveloper/",
        github: "https://github.com/viniciusvinny233"
    },
    {
        role: "Backend",
        name: "Matheus Guedes Bertaiolli ",
        icon: MatheusGuedes,
        linkedin: "https://www.linkedin.com/in/matheusbertaiolli/",
        github: "https://github.com/matheusgbrt"
    },
    {
        role: "PITCH I",
        name: "Vitor Futida Sternik",
        icon: VitorFutida,
        linkedin: "https://www.linkedin.com/in/vitor-sternik-7170b5228/",
        github: "https://github.com/Vitorfs2509"
    },
    {
        role: "PITCH II",
        name: "Dionísio Sant’Ana Pereira",
        icon: DionisioSantana,
        linkedin: "https://www.linkedin.com/in/dionisio-santana-pereira/",
        github: "https://github.com/dionisiosp"
    },
]
