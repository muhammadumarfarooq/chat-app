import React, {useState, useEffect} from 'react';
import {
    Container,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Button,
    Stack,
    AppBar,
    Toolbar,
    Typography,
    CardActions
} from "@mui/material";
import ChatMessageList from '../src/components/ChatMessageList';
import ChatMessageInput from '../src/components/ChatMessageInput';
import io from 'socket.io-client';

let socket;
export default function Index() {
    const [viewChat, setViewChat] = useState(false);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSendMessage = (msg) => {
        socket.emit('send-message', room, msg, () => {
            setMessages([...messages, msg]);
        });
    };

    useEffect(() => {
        socket = io('http://localhost:4000');
        socket.on('connect', () => {
            console.log('Connected successfully', socket.id);
        });

        socket.on('received-message', (message) => {
            setMessages((prevState) => [...prevState, message]);
        });
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        if (name && room) {
            socket.emit('join-room', room, () => {
                setViewChat(true);
                console.log('Room joined');
            });
        }
    }

    if (viewChat) {
        return (
            <Container maxWidth="md" sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Card sx={{height: '100%', maxHeight: 600, width: 500, display: 'flex', flexDirection: 'column'}}>
                    <CardHeader
                        title={(
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                        {name} ({room})
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        )}
                        sx={{p: 0}}
                    />
                    <Divider/>
                    <CardContent sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        p: 0,
                        '&:last-child': {pb: 0}
                    }}>
                        <ChatMessageList messages={messages} myId={socket.id}/>
                        <Divider/>
                        <ChatMessageInput
                            myId={socket.id}
                            onSend={handleSendMessage}
                            name={name}
                        />
                    </CardContent>
                </Card>
            </Container>
        )
    }

    return (
        <Container maxWidth="md" sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card sx={{height: '100%', maxHeight: 600, width: 500, display: 'flex', flexDirection: 'column'}}>
                <CardHeader
                    title={(
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                    Enter name and room
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    )}
                    sx={{p: 0}}
                />

                <CardContent sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    p: 0,
                    '&:last-child': {pb: 0}
                }}>
                    <Stack onSubmit={onSubmit} component="form" id='chat-details' sx={{py: 5, px: 1.6}} spacing={2.4}>
                        <TextField
                            id="name-input"
                            label="Name"
                            placeholder='Enter your name'
                            variant="outlined"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            id="room-input"
                            label="Room"
                            variant="outlined"
                            placeholder='Enter your room'
                            value={room} onChange={(e) => setRoom(e.target.value)}/>
                    </Stack>
                </CardContent>

                <CardActions sx={{p: 0}}>
                    <Button type='submit' variant='contained' form='chat-details' size='large' sx={{width: '100%'}}>
                        Submit
                    </Button>
                </CardActions>

            </Card>
        </Container>
    )

}
