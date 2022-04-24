import {useEffect, useRef} from 'react';
//
import ChatMessageItem from './ChatMessageItem';
import Scrollbar from "./Scrollbar";

// ----------------------------------------------------------------------

export default function ChatMessageList({messages}) {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollMessagesToBottom = () => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        };
        scrollMessagesToBottom();
    }, [messages]);

    const myId = 'abc'; // will update it.

    return (
        <Scrollbar scrollableNodeProps={{ref: scrollRef}} sx={{p: 3, height: 1}}>
            {messages.map((message) => (
                <ChatMessageItem
                    key={message.id}
                    message={message}
                    myId={myId}
                />
            ))}
        </Scrollbar>
    );
}
