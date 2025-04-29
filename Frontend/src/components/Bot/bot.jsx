import React from 'react';
import BotIcon from '../../images/bot/Bot.svg';
import './bot.css';

function ChatBot({ message = "¡Hola!" }) {
    return (
      <div className="bot-container">
        <img src={BotIcon} alt="Chatbot" className="bot-image" />
        <div className="bot-message">
          <p>{message}</p>
        </div>
      </div>
    );
  }

/*
how to use the chatbot
 EXAMPLES
detail-course page
<ChatBot message="Hola, ¿te interesa este curso?" />

// Profile page
<ChatBot message=", bienvenido a tu perfil!" />

// to import it with default message
<ChatBot />
*/

export default ChatBot;