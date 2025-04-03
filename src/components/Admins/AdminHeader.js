import { memo } from 'react';

import { TableCell, TableHead, TableRow, Typography } from '@mui/material';

const UserHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>
            <Typography variant='h6'>Name</Typography>
        </TableCell>
        <TableCell>
          <Typography variant='h6'>Email</Typography>
        </TableCell>
        <TableCell>
          <Typography variant='h6'>Type</Typography>
        </TableCell>
       
        <TableCell>
          <Typography variant='h6'>Operations</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default memo(UserHeader);
