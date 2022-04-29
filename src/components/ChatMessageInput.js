import PropTypes from 'prop-types';
import {useState} from 'react';
// @mui
import {styled} from '@mui/material/styles';
import {Input, Divider, IconButton} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// utils
import {uid} from 'uid'
// components

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    minHeight: 56,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ChatMessageInput.propTypes = {
    name: PropTypes.string,
    userId: PropTypes.string,
    onSend: PropTypes.func,
};

export default function ChatMessageInput({myId, onSend, name}) {
    const [message, setMessage] = useState('');

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const handleSend = () => {
        if (!message) {
            return;
        }

        onSend({
            userId: myId,
            messageId: uid(),
            message,
            name,
            createdAt: new Date(),
        });
        setMessage('');
    };

    return (
        <RootStyle>
            <Input
                fullWidth
                value={message}
                disableUnderline
                onKeyUp={handleKeyUp}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type a message"
            />

            <Divider orientation="vertical" flexItem/>

            <IconButton color="primary" disabled={!message} onClick={handleSend} sx={{mx: 1}}>
                <SendIcon/>
            </IconButton>

        </RootStyle>
    );
}
