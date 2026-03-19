import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div
            className={`py-8 ${isUser ? 'bg-transparent' : 'bg-gray-800/50'
                } border-b border-gray-800 transition-colors`}
        >
            <div className="max-w-4xl mx-auto flex gap-6 px-4 md:px-0">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <div
                        className={`w-8 h-8 rounded-sm flex items-center justify-center shadow-sm ${isUser ? 'bg-purple-600 text-white' : 'bg-emerald-600 text-white'
                            }`}
                    >
                        {isUser ? <User size={20} /> : <Bot size={20} />}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold mb-1 text-gray-300">
                        {isUser ? 'You' : 'ChatGPT'}
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-100 leading-relaxed whitespace-pre-wrap">
                        {message.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
