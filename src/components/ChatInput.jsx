import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="w-full relative px-4 pb-4 sm:px-0">
            <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 bg-gray-800 border border-gray-700 rounded-xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
            >
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message ChatGPT..."
                    disabled={disabled}
                    className="w-full bg-transparent text-gray-100 placeholder-gray-400 border-0 focus:ring-0 resize-none py-2 px-3 max-h-[200px] outline-none disabled:opacity-50"
                    rows={1}
                    style={{ minHeight: '44px' }}
                />
                <button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors flex-shrink-0 self-end mb-1"
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
            <div className="text-center text-xs text-gray-400 mt-2">
                ChatGPT can make mistakes. Consider verifying important information.
            </div>
        </div>
    );
};

export default ChatInput;
