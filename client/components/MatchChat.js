import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function MatchChat({profileId, matchId}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

    // TODO: get chatroomId
  const chatroomId = 1;

  useEffect(() => {

    async function getMessages() {
      const response = await axios.put(`/api/chat/${profileId}`,{matchId: matchId});
      setMessages(response.data);
    }
    getMessages();
  }, [matchId]);

  async function sendMessage() {
    if (newMessage.length) {
        const response = await axios.post(`/api/chat/${chatroomId}`, {senderId: profileId, messageText: newMessage});
    }
  }
  return (
    <div>
      <div>Match Chat</div>
      {messages.map((message) => {
        return (
          <div key={message.id}>
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
