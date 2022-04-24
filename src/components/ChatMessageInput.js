import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Input, Divider, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// utils
import uid from 'uid';
// components

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
    minHeight: 56,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
    disabled: PropTypes.bool,
    conversationId: PropTypes.string,
    onSend: PropTypes.func,
};

export default function ChatMessageInput({ disabled, conversationId, onSend }) {

    const [message, setMessage] = useState('');

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const handleSend = () => {
        if (!message) {
            return '';
        }
        if (onSend && conversationId) {
            onSend({
                conversationId,
                messageId: uid(),
                message,
                contentType: 'text',
                attachments: [],
                createdAt: new Date(),
                senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
            });
        }
        return setMessage('');
    };

    return (
        <RootStyle>
            <Input
                disabled={disabled}
                fullWidth
                value={message}
                disableUnderline
                onKeyUp={handleKeyUp}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message"
            />

            <Divider orientation="vertical" flexItem />

            <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{ mx: 1 }}>
                <SendIcon />
            </IconButton>

        </RootStyle>
    );
}
