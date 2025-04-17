import React, { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import BotIcon from '../../images/Bot.svg';
import './bot.css';

function ChatBot({ message}) {
  const user = useContext(UserContext);
  const userName = user?.name || 'usuario';
  
  const displayMessage = message.replace('{user}', userName);

  return (
    <div className="bot-container">
      <img src={BotIcon} alt="Chatbot" className="bot-image" />
      <div className="bot-message">
        <p>{displayMessage}</p>
      </div>
    </div>
  );
}

/*
how to use the chatbot
 EXAMPLES
detail-course page
<ChatBot message="Hola {user}, ¿te interesa este curso?" />

// Profile page
<ChatBot message="¡{user}, bienvenido a tu perfil!" />

// to import it with default message
<ChatBot />
*/

export default ChatBot;