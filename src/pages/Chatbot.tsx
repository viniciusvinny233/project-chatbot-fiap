import React, { useState } from 'react';
import BotIcon from '../assets/images/2.png';
import AnexoIcon from '../assets/images/8.png';
import EnviarIcon from '../assets/images/9.png';

// Função para formatar a data e hora
const formatDateTime = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const Message = ({ text, isUserMessage, image, timestamp }: { text?: string, isUserMessage: boolean, image?: string, timestamp: Date }) => {
  return (
    <div className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} my-2`}>
      {!isUserMessage && (
        <img src={BotIcon} alt="Bot" className="w-12 h-12 rounded-full mr-2 self-end" />
      )}
      
      <div className="flex flex-col">
        <div className={`max-w-xs p-3 ${isUserMessage 
          ? 'rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' 
          : 'rounded-tl-2xl rounded-br-2xl rounded-tr-2xl'} 
          ${isUserMessage ? 'bg-[#3cd0db]' : 'bg-[#A7E2E4]'} text-gray-800 break-words whitespace-pre-wrap`}>
          {image ? <img src={image} alt="User upload" className="rounded-2xl" /> : text}
        </div>
        <span className={`text-xs text-gray-400 mt-1 ${isUserMessage ? 'text-right' : 'text-left'}`}>
          {formatDateTime(timestamp)}
        </span>
      </div>
    </div>
  );
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text?: string, isUserMessage: boolean, image?: string, timestamp: Date }[]>([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessages = [{ text: userInput, isUserMessage: true, timestamp: new Date() }, ...messages];
    setMessages(newMessages);
    setUserInput('');

    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      setMessages([{ text: botResponse, isUserMessage: false, timestamp: new Date() }, ...newMessages]);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newMessages = [{ image: reader.result as string, isUserMessage: true, timestamp: new Date() }, ...messages];
        setMessages(newMessages);

        setTimeout(() => {
          const botResponse = "Você enviou uma imagem! Parece interessante!";
          setMessages([{ text: botResponse, isUserMessage: false, timestamp: new Date() }, ...newMessages]);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const getBotResponse = (userMessage: string) => {
    const responses: { [key: string]: string } = {
      'olá': 'Olá! Como posso ajudar você hoje?',
      'tudo bem?': 'Estou bem, obrigado por perguntar!',
      'quem é você?': 'Eu sou o chatbot da Catech, estou aqui para te ajudar.',
      'ajuda': 'Claro, estou aqui para ajudar! O que você precisa saber?',
    };

    return responses[userMessage.toLowerCase()] || 'Desculpe, não entendi sua pergunta.';
  };

  return (
    <div className='flex flex-col items-center min-h-screen w-full bg-custom-gradient'>
      <div className="flex flex-col-reverse bg-transparent text-black p-4 w-full h-[90vh] max-w-[57rem] mx-auto">
        <div className="flex flex-col-reverse overflow-y-auto h-full scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-[#77C1C6] scrollbar-track-[#2a2a2a] pr-4">
          {messages.map((message, index) => (
            <Message key={index} text={message.text} isUserMessage={message.isUserMessage} image={message.image} timestamp={message.timestamp} />
          ))}
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
          className="flex-grow p-2 px-5 bg-[#2a2a2a] text-white rounded-2xl focus:outline-none"
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
