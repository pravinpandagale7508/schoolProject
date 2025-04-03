import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Table, TableBody, TableContainer, Paper, TablePagination } from '@mui/material';
import UsersHeader from './UsersHeader';
import UsersRow from './UsersRow';
import AddUsers from './AddUsers';
import { getUsers, getWarehouseList, getSenderList } from '../Admins/AdminHandler'
import { REQUEST_ACTIONS, sendRequest } from '../../utils/Communicator';
import { useSelector, useDispatch } from 'react-redux';
import { onAdminChange, onWarehouseChange } from '../../reducers/admin-reducers/AdminSlicer';
import { snackbarToggle } from '../../reducers/snackbarSlicer';
import { Dialog, Snackbar } from '../../style-guide';
import { URL, LANGUAGES } from '../../constants/global-constants';

export const UsersTable = () => {
    const dispatch = useDispatch();
    const { adminList, admin, warehouseList, senderList, users } = useSelector(state => state.admin);
    const { snackbar } = useSelector(state => state.snackbar);
    const [isLoaded, setIsLoaded] = useState(false);
    const onSnackbarHandleClose = () => dispatch(snackbarToggle(false));
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const onHandleOpenModal = () => {
        setOpenOrderModal(true);
        getWarehouseList(dispatch, admin);
        getUsers(dispatch, admin);
    };
    const onHandleCancelModal = () => setOpenOrderModal(false);

    // pagination
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const onPageHandleChange = (_, newPage) => {
        setPage(newPage);
    };
    const onRowsPerPageHandleChange = event => {
        setSize(+event.target.value);
        setPage(0);
    };
    if (!isLoaded) {
        getWarehouseList(dispatch, admin);
        getSenderList(dispatch, admin);
        getUsers(dispatch, admin);
        setIsLoaded(true);
    }

    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {openOrderModal && (
                <Dialog maxWidth='sm' open={openOrderModal} title={`NEW USER`} onHandleCancel={onHandleCancelModal}>
                    <AddUsers onHandleCancel={() => setOpenOrderModal(false)} id={null} />
                </Dialog>
            )}
            {users.length > 0 && <TableContainer sx={{ maxHeight: 800 }}>
                <Table>
                    <UsersHeader />
                    <TableBody>
                        {users.length>0&&
                            users.map(user => (
                                <UsersRow key={user?.id || uuidv4()} data={user} />
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>}
            {snackbar && (
                <Snackbar
                    open={!!snackbar}
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={onSnackbarHandleClose}
                />
            )}
        </Paper>


    );
};
export default UsersTable;
