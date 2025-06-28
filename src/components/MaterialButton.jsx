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