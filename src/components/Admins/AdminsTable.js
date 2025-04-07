import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import { Button, Table, TableBody, TableContainer, Paper, TablePagination } from '@mui/material';
import UserHeader from './AdminHeader';
import AdminRow from './AdminRow';
import AddAdmin from './AddAdmin';
import { getAdminList, deleteAdmin } from './AdminHandler'
import { REQUEST_ACTIONS, sendRequest } from '../../utils/Communicator';
import { useSelector, useDispatch } from 'react-redux';
import { snackbarToggle } from '../../reducers/snackbarSlicer';
import { Dialog, Snackbar } from '../../style-guide';
import { URL, LANGUAGES } from '../../constants/global-constants';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {

    GridCsvExportOptions,
    GridCsvGetRowsToExportParams,
    gridSortedRowIdsSelector,
    GridToolbar,
    GridCellModes,
    useGridApiContext,
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';


//CustomToolbar tool bar start
const CustomToolbar = (props) => {
    const { setOpenOrderModal, setSelectedData } = props;
    const apiRef = useGridApiContext();

    const handleExport = (options) =>
        apiRef.current.exportDataAsCsv(options);

    const buttonBaseProps = {
        color: 'primary',
        size: 'small',
        startIcon: <></>,
    };
    function addNewAdmin() {
        setOpenOrderModal(true)
        setSelectedData({})
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={addNewAdmin}>
                Add record
            </Button>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleExport}>
                Export
            </Button>
            <GridToolbar />
        </GridToolbarContainer>
    );
};
//CustomToolbar tool bar ENd
export const AdminsTable = () => {
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.admin);
    const { adminList, admin } = useSelector(state => state.admin);
    const { snackbar } = useSelector(state => state.snackbar);
    const [selectedData, setSelectedData] = useState({});
    const [rows, setRows] = useState([]);
    const onSnackbarHandleClose = () => dispatch(snackbarToggle(false));
    const [openOrderModal, setOpenOrderModal] = useState(false);
    const onHandleOpenModal = () => {
        setOpenOrderModal(true);
        // getAdminList(dispatch, admin);
    };
    const onHandleCancelModal = () => setOpenOrderModal(false);

    function loadAdmin() {
        getAdminList(dispatch, admin, (list) => {
            var temp = list.map((data) => {
                console.log(roles)
                const name = roles.find((row) => row.name === data?.roles[0].name)?.label;
                return { ...data, role: name }
            });
            setRows(temp)
        })
    }
    // hook will automatically execute when ever there is change in admin object
    useEffect(() => {
        if (admin?.data?.accessToken) {
            loadAdmin()
        }
    }, [dispatch, admin]);



    const handleEditClick = (id) => () => {
        const editedRow = adminList.find((row) => row.id === id);
        setSelectedData(editedRow)
        onHandleOpenModal()
    };



    const handleDeleteClick = (id) => () => {
        deleteAdmin(dispatch, snackbarToggle, id, loadAdmin);
    };


    const columns = [
        { field: 'username', headerName: 'User Name', width: 200, editable: true, },
        {
            field: 'email',
            headerName: 'Email',
            editable: true,
            width: 500,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 500,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];
    return (

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {openOrderModal && (
                <Dialog maxWidth='sm' open={openOrderModal} title={selectedData.id ? 'Update' : 'New' + `Admin`} onHandleCancel={onHandleCancelModal}>
                    <AddAdmin loadAdmin={loadAdmin} data={selectedData} onHandleCancel={() => setOpenOrderModal(false)} id={null} />
                </Dialog>
            )}
            <Box sx={{ height: 610 }}>
                <DataGrid sx={{ maxHeight: 800 }}
                    rows={rows}
                    columns={columns}
                    slots={{ toolbar: CustomToolbar }}
                    pageSizeOptions={[5, 10, 25]}
                    slotProps={{
                        toolbar: { setOpenOrderModal, setSelectedData },
                    }}

                />
                
            </Box>



            {false && <TableContainer sx={{ maxHeight: 800 }}>
                <Table>
                    <UserHeader />
                    <TableBody>
                        {
                            adminList.map(user => (
                                <AdminRow key={user?.id || uuidv4()} data={user} />
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
export default AdminsTable;
