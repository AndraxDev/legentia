import {Button, styled} from "@mui/material";

export const MaterialButton = styled(Button)(() => ({
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
    },
    padding: '8px 24px',
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '500',
}));

export const MaterialButtonDialogFilled = styled(Button)(() => ({
    backgroundColor: '#cecece',
    color: '#121212',
    '&:hover': {
        backgroundColor: '#fff',
    },
    padding: '6px 20px',
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '500',
}));

export const MaterialButtonDialogOutlined = styled(Button)(() => ({
    backgroundColor: '#212121',
    border: '1px solid #cecece',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#212121',
    },
    padding: '5px 18px',
    borderRadius: '24px',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: '500',
}));