import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function MatchChat() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // TODO: get chatroomId
    const chatroomId = 1;

    async function getMessages() {
      const response = await axios.get(`/api/chat/${chatroomId}`);
      console.log('messages', response.data);
      setMessages(response.data);
    }
    getMessages();
  }, []);
  return (
    <div>
      <div>Match Chat</div>
      {messages.map((message) => {
        return (
          <div>
            <div>{message.owner}</div>
            <div>{message.messagetext}</div>
          </div>
        );
      })}
      <input className='border-solid border-2 border-indigo-600' />
      <button>Send Message</button>
    </div>
  );
}
