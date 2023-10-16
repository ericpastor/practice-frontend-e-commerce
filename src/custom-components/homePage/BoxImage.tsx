import { Box, styled } from '@mui/material';

const BoxImage = styled(Box)(
    ({ theme }) => ({
        backgroundImage: 'url("https://i.imgur.com/x0K3SKA.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '400px',
        width: '90%',
        margin: '20px auto 20px auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'left',
        fontSize: '24px',
    })
);

export default BoxImage;
