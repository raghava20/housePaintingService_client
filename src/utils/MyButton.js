import React from "react";

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default ({ children, onClick, tip, btnClassName, tipClassName }) => {
    return <Tooltip title={tip} className={tipClassName} placement="bottom">
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
}