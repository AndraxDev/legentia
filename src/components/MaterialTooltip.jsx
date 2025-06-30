import {styled, Tooltip} from "@mui/material";

export const MaterialTooltip = styled(Tooltip)(() => ({
    "& .MuiTooltip-tooltip": {
        borderRadius: "16px"
    }
}))