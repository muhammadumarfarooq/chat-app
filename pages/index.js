import * as React from 'react';
import {Container, Card, CardContent, CardHeader, Divider} from "@mui/material";
import ChatMessageList from '../src/components/ChatMessageList';
import ChatMessageInput from '../src/components/ChatMessageInput';

const messages = [
    {id: 'abc', name: 'Umar', createdAt: new Date().toISOString(), text: "Hello"},
    {id: 'abc', name: 'Umar', createdAt: new Date().toISOString(), text: "Hey, please reply!"},
    {id: '123', name: 'Hassan', createdAt: new Date().toISOString(), text: "Hello"},
    {id: '123', name: 'Hassan', createdAt: new Date().toISOString(), text: "How can I help you?"},
    {id: 'abc', name: 'Umar', createdAt: new Date().toISOString(), text: "can you tell how to upload a file?"},
    {id: '123', name: 'Hassan', createdAt: new Date().toISOString(), text: "Yes,"}, {
        id: 'abc',
        name: 'Umar',
        createdAt: new Date().toISOString(),
        text: "Hello"
    },
    {id: 'abc', name: 'Umar', createdAt: new Date().toISOString(), text: "Hey, please reply!"},
    {id: '123', name: 'Hassan', createdAt: new Date().toISOString(), text: "Hello"},
    {id: '123', name: 'Hassan', createdAt: new Date().toISOString(), text: "How can I help you?"},
    {id: 'abc', name: 'Umar', createdAt: new Date().toISOString(), text: "can you tell how to upload a file?"},
    {id: '123', name: 'Hassan', createdAt: new Date().toISOString(), text: "Yes,"},
];

export default function Index() {

    const handleSendMessage = () => {
    };

    return (
        <Container maxWidth="md" sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card sx={{height: '100%', maxHeight: 600, width: 500, display: 'flex', flexDirection: 'column'}}>
                <CardHeader title='Umar' sx={{color: '#fff', bgcolor: '#005555'}}/>
                <Divider/>
                <CardContent sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    p: 0,
                    '&:last-child': {pb: 0}
                }}>
                    <ChatMessageList messages={messages}/>
                    <Divider/>
                    <ChatMessageInput
                        conversationId=''
                        onSend={handleSendMessage}
                    />
                </CardContent>
            </Card>
        </Container>
    );
}
