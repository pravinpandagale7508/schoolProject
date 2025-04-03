import { Tooltip, Typography } from '@mui/material';
import { memo } from 'react';

const TooltipWrapper = ({ title, children }) => {
  return (
    <Tooltip
      title={
        <Typography variant='subtitle2' p={1}>
          {title}
        </Typography>
      }
      placement='top'
      arrow>
      {children}
    </Tooltip>
  );
};

TooltipWrapper.defaultProps = {
  title: '',
};

export default memo(TooltipWrapper);
