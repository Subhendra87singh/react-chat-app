import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from './../../firebase';

export default function Chat() {
    const account = useSelector(state => state.account);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    const handleSendMessage = async () => {
        if (account.selectedUser === undefined || account.user === undefined || !newMessage) return;

        const chatId = [account.selectedUser.user_id, account.user.uid].sort().join('_');
        try {
            const messagesCollection = collection(db, 'chats', chatId, 'messages');

            await addDoc(messagesCollection, {
                text: newMessage,
                sender: account.user.uid,
                timestamp: serverTimestamp(),
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setNewMessage('');
    };

    useEffect(() => {
        if (account.selectedUser === undefined || account.user === undefined) return;

        const chatId = [account.selectedUser.user_id, account.user.uid].sort().join('_');
        const messagesCollection = collection(db, 'chats', chatId, 'messages');
        const messagesQuery = query(messagesCollection, orderBy('timestamp'));

        try {
            const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
                const messageList = snapshot.docs.map((doc) => doc.data());
                setMessages(messageList);
                setTimeout(() => {
                    if (chatContainerRef.current) {
                        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                    }
                }, 500);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error);
        }
    }, [account.selectedUser, account.user]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp?.seconds * 1000);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    return (
        <div className="w-3/4 bg-gray-500 p-4">
            <h2 className="text-xl font-bold mb-4 text-white">{account.selectedUser?.displayName}</h2>
            <div ref={chatContainerRef} className="mb-4" style={{ height: '565px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <div key={index} className={`${message.sender === account.user.uid ? 'ml-auto bg-gray-800' : 'mr-auto bg-green-800'} space-x-2 font-sans font-bold flex flex-col w-full max-w-[320px] leading-1.5 p-2 text-gray-200 m-4 rounded-e-xl rounded-es-xl `}>
                        <div className="text-xs text-gray-400">{formatTimestamp(message.timestamp)}</div>
                        <div>{message.text}</div>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow p-2 mr-2 border-none rounded-lg bg-gray-400 focus:outline-none text-white"
                />
                <button onClick={() => handleSendMessage()} className="p-2 bg-gray-900 text-white rounded flex">Send</button>
            </div>
        </div>
    );
}
