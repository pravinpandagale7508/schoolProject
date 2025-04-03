import { memo } from 'react';
import { useState } from 'react';
import { TableCell, TableHead, TableRow, Typography, Button } from '@mui/material';
import AddUsers from './AddUsers';
import { Dialog } from '../../style-guide';

const UsersHeader = () => {
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const onHandleOpenModal = () => setOpenOrderModal(true);
    const onHandleCancelModal = () => setOpenOrderModal(false);

    return (
        <TableHead>
            <TableRow>
                <TableCell >
                    <Typography variant='h6'>

                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        User Name
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        First name
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        Last name
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        Nick name
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        Locker ID
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        Email
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        Phone
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography variant='h6'>
                        Operations
                    </Typography>
                </TableCell>
                

            </TableRow>
        </TableHead>
    );
};

export default memo(UsersHeader);
