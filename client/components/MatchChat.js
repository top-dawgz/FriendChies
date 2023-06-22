import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function MatchChat({profileId}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
    // TODO: get chatroomId
  const chatroomId = 1;

  useEffect(() => {

    async function getMessages() {
      const response = await axios.get(`/api/chat/${chatroomId}`);
      console.log('messages', response.data);
      setMessages(response.data);
    }
    getMessages();
  }, []);

  async function sendMessage() {
    const response = await axios.post(`/api/chat/${chatroomId}`, {senderId: profileId, messageText: newMessage});
    console.log(response)
  }
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
      <input className='border-solid border-2 border-indigo-600' value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
