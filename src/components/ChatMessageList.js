import {useEffect, useRef} from 'react';
//
import ChatMessageItem from './ChatMessageItem';
import Scrollbar from "./Scrollbar";

// ----------------------------------------------------------------------

export default function ChatMessageList({messages, myId}) {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollMessagesToBottom = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        };
        scrollMessagesToBottom();
    }, [messages]);

    return (
        <Scrollbar scrollableNodeProps={{ref: scrollRef}} sx={{p: 3, height: 1}}>
            {messages.map((message) => (
                <ChatMessageItem
                    key={message.messageId}
                    message={message}
                    myId={myId}
                />
            ))}
        </Scrollbar>
    );
}
