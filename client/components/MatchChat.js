import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MatchChat({ profileId, matchId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // TODO: get chatroomId
  const chatroomId = 1;

  useEffect(() => {
    async function getMessages() {
      const response = await axios.put(`/api/chat/${profileId}`, {
        matchId: matchId,
      });
      setMessages(response.data);
    }
    getMessages();
  }, [matchId]);

  async function sendMessage() {
    if (newMessage.length) {
      const response = await axios.post(`/api/chat/${chatroomId}`, {
        senderId: profileId,
        messageText: newMessage,
      });
      window.location.reload(); //TODO: Do this better
    }
  }
  return (
    <div>
      <div className="text-2xl text-center m-3">Match Chat</div>
      <table>
        {messages.map((message) => {
          return (
            <tr key={message.id}>
              <td className="font-bold w-20">{message.owner}</td>
              <td>{message.messagetext}</td>
            </tr>
          );
        })}
      </table>
      <input
        className="border-solid border-2 border-indigo-600 leading-9 w-9/12"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        className="border-solid border-2 rounded ml-4 p-2 border-indigo-600 active:bg-indigo-500 hover:bg-indigo-300"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
