import {styled, Tooltip, tooltipClasses} from "@mui/material";

export const MaterialTooltip = styled(Tooltip)(() => ({
    "& .MuiTooltip-tooltip": {
        borderRadius: "16px"
    }
}))