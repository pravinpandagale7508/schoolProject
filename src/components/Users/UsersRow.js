import { useState } from 'react';
import { TableCell, TableRow, Typography, Box, Button } from '@mui/material';
import AddUsers from './AddUsers';
import { Dialog } from '../../style-guide';
import { useSelector, useDispatch } from 'react-redux';
import { addUsers } from '../Admins/AdminHandler'
import { snackbarToggle } from '../../reducers/snackbarSlicer';

const UsersRow = ({ data }) => {
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.admin);
    const { admin, warehouseList } = useSelector(state => state.admin);
    const { snackbar } = useSelector(state => state.snackbar);
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const onHandleOpenModal = () => setOpenOrderModal(true);
    const onHandleCancelModal = () => setOpenOrderModal(false);
    return (
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell />
           
            <TableCell>
                <Typography variant='body1' component='span'>
                    {data.userName || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body1' component='span'>
                    {data.firstName || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body1' component='span'>
                    {data.lastName || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body1' component='span'>
                    {data.nickName || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body1' component='span'>
                    {data.token || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body1' component='span'>
                    {data.email || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant='body1' component='span'>
                    {data.phone || '-'}
                </Typography>
            </TableCell>
            <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button onClick={onHandleOpenModal} variant='outlined'>
                        Edit
                    </Button>
                    {openOrderModal && (
                        <Dialog open={openOrderModal} title={'Sender'} onHandleCancel={onHandleCancelModal}>
                            <AddUsers data={data} onHandleCancel={onHandleCancelModal} id={null} />
                        </Dialog>
                    )}
                </Box>
            </TableCell>
            <TableCell />
        </TableRow>
    );
};

export default UsersRow;
