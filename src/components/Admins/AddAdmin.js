import { useState, useCallback, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { SelectField, TextField, MultilineField } from '../../style-guide';
import { sendRequest, REQUEST_ACTIONS } from '../../utils/Communicator';
import { useDispatch, useSelector } from 'react-redux';
import { snackbarToggle } from '../../reducers/snackbarSlicer';
import { setAdmin, onWarehouseChange } from '../../reducers/admin-reducers/AdminSlicer';
import { Snackbar } from '../../style-guide';
import imgHide from './hide.png'
import imgShow from './show.png'
import { URL, LANGUAGES } from '../../constants/global-constants';
import { addAdmin,updateAdmin,deleteAdmin } from './AdminHandler'

const AddAdmin = props => {
    const dispatch = useDispatch();
    const { roles } = useSelector(state => state.admin);
    const { admin, warehouseList } = useSelector(state => state.admin);
    const { snackbar } = useSelector(state => state.snackbar);
    const onSnackbarHandleClose = () => dispatch(snackbarToggle(false));
    const failedCallback = useCallback(message => dispatch(snackbarToggle({ type: 'error', message })), [dispatch]);
    const [value, setValue] = useState(
        props.data
            ? {
                id: props.data.id,
                sessionId: admin.data.session,
                username: props.data.username,
                password: props.data.password,
                email: props.data.email,
                role:   roles?.find((row) => row.name === props?.data?.roles?.at(0)?.name)?.id
            }
            : {
                id: null,
                sessionId: null,
                username: null,
                password: null,
                email: null,
                role:null
            },
    );

    const save = () => {
        var data = {...value}
        var tempRoles = []
        tempRoles.push(roles?.find((row) => row.id === value?.role).label)
        data.role = tempRoles;
        addAdmin(dispatch, snackbarToggle, data, props.loadAdmin);
        props.onHandleCancel();

    };

    const seePassword = () => {
        setValue(prev => ({ ...prev, seePass: !value.seePass }))
    }

    const update = () => {
        var data = {...value}
        var tempRoles = []
        tempRoles.push(roles?.find((row) => row.id === value?.role).label)
        data.role = tempRoles;
        updateAdmin(dispatch, snackbarToggle, data, props.loadAdmin);
        props.onHandleCancel();
    };
    
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (!isLoaded) {
            //getWarehouseList();
            // getPackages();
        }
    }, [dispatch, failedCallback, warehouseList]);

    const setPermissionsData = (event) => {
        var data = {
            warehouseId: event.target.value
        }
        setValue(prev => ({ ...prev, permissions: data }));
    }

    return (
        <div>
            <Grid container item spacing={2}>
                <Grid container item spacing={2}>
                    <TextField
                        required
                        lg={11}
                        readOnly={value.id ? true : false}
                        value={value.username}
                        onChange={event => setValue(prev => ({ ...prev, username: event.target.value }))}
                        label='User Name'
                    />                    
                    <TextField
                        required
                        lg={5.5}
                        label='Email'
                        value={value.email}
                        onChange={event => setValue(prev => ({ ...prev, email: event.target.value }))}
                    />
                   
                    {!value.id && <TextField
                        required
                        lg={5.5}
                        value={value.password}
                        label='Password'
                        type="password"
                        readOnly={value.id ? true : false}
                        onChange={event => setValue(prev => ({ ...prev, password: event.target.value }))}
                    />}
                    <SelectField
                        required
                        value={value.role}
                        lg={5.5}
                        onChange={event => {
                            setValue(prev => ({ ...prev, role: event.target.value }))
                        }}
                        label='Type'
                        options={roles}
                    />
                    
                </Grid>
                <Grid container item justifyContent='flex-end' lg={11}>
                    <Button variant='contained' sx={{ mt: 2, mr: 2 }} onClick={props.data?.id ? update : save}>
                        Save
                    </Button>
                    <Button variant='contained' sx={{ mt: 2 }} color='secondary' onClick={props.onHandleCancel}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
            {snackbar && (
                <Snackbar open={!!snackbar} message={snackbar.message} type={snackbar.type} onClose={onSnackbarHandleClose} />
            )}
        </div>
    );
};

export default AddAdmin;
