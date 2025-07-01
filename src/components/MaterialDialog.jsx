import {Dialog, styled, dialogClasses} from "@mui/material";

export const MaterialDialog = styled(Dialog) (() => ({
    [`& .${dialogClasses.paper}`]: {
        backgroundColor: "#212121",
        color: "#fff",
        borderRadius: "24px",
        padding: "8px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
    },
    [`& .${dialogClasses.container}`]: {
        fontSize: "16px",
        lineHeight: "1.5",
        userSelect: "none",
    },
}));