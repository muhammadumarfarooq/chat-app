import {formatDistanceToNowStrict} from 'date-fns';
// @mui
import {styled} from '@mui/material/styles';
import {Box, Typography} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
    display: 'flex',
    marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({theme}) => ({
    maxWidth: 320,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F4F6F8',
}));

const InfoStyle = styled(Typography)(({theme}) => ({
    display: 'flex',
    marginBottom: theme.spacing(0.75),
    color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

export default function ChatMessageItem({message, myId}) {
    const {userId, name, createdAt, message: text} = message;

    const isMe = userId === myId;

    return (
        <RootStyle>
            <Box
                sx={{
                    display: 'flex',
                    ...(isMe && {
                        ml: 'auto',
                    }),
                }}
            >
                <Box sx={{ml: 2}}>
                    <InfoStyle noWrap variant="caption" sx={{...(isMe && {justifyContent: 'flex-end'})}}>
                        {!isMe && `${name},`}&nbsp;
                        {formatDistanceToNowStrict(new Date(createdAt), {
                            addSuffix: true,
                        })}
                    </InfoStyle>

                    <ContentStyle
                        sx={{
                            ...(isMe && {
                                color: '#212B36',
                                bgcolor: '#C8FACD',
                            }),
                        }}
                    >

                        <Typography variant="body2">{text}</Typography>
                    </ContentStyle>
                </Box>
            </Box>
        </RootStyle>
    );
}
