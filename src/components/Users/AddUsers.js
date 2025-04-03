import { useState, useCallback, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { SelectField, TextField, MultilineField } from '../../style-guide';
import { sendRequest, REQUEST_ACTIONS } from '../../utils/Communicator';
import { useDispatch, useSelector } from 'react-redux';
import { snackbarToggle } from '../../reducers/snackbarSlicer';
import { setAdmin, onWarehouseChange } from '../../reducers/admin-reducers/AdminSlicer';
import { Snackbar } from '../../style-guide';
import { URL, LANGUAGES } from '../../constants/global-constants';
import { updateUser } from '../Admins/AdminHandler'

const AddUsers = props => {
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
                userName: props.data.userName,
                firstName: props.data.firstName,
                lastName: props.data.lastName,
                nickName: props.data.nickName,
                token: props.data.token,
                email: props.data.email,
                phone: props.data.phone,
                password: props.data.password,
            }
            : {
                id: null,
                userName: null,
                firstName: null,
                lastName: null,
                nickName: null,
                token: null,
                email: null,
                phone: null,
                password: null,
            },
    );

    const save = () => {
        updateUser(dispatch, snackbarToggle, value, admin);
        props.onHandleCancel();

    };

    const update = () => {
        updateUser(dispatch, snackbarToggle, value, admin);
        props.onHandleCancel();
    };
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (!isLoaded) {
           
            // getPackages();
        }
    }, [dispatch, failedCallback, warehouseList]);

    return (
        <div>
            <Grid container item spacing={2}>
                <Grid container item spacing={2}>
                    <TextField
                        required
                        lg={5.5}
                        value={value.userName}
                        readOnly={value.id ? true : false}
                        onChange={event => setValue(prev => ({ ...prev, userName: event.target.value }))}
                        label='Username'
                    />
                    <TextField
                        required
                        lg={5.5}
                        value={value.token}
                        onChange={event => setValue(prev => ({ ...prev, token: event.target.value }))}
                        label='Locker Id'
                    />
                    <TextField
                        required
                        lg={5.5}
                        value={value.firstName}
                        onChange={event => setValue(prev => ({ ...prev, firstName: event.target.value }))}
                        label='Firstname'
                    />
                    <TextField
                        required
                        lg={5.5}
                        value={value.lastName}
                        onChange={event => setValue(prev => ({ ...prev, lastName: event.target.value }))}
                        label='Lastname'
                    />
                    <TextField
                        required
                        lg={5.5}
                        value={value.nickName}
                        onChange={event => setValue(prev => ({ ...prev, nickName: event.target.value }))}
                        label='NickName'
                    />
                    
                    <TextField
                        required
                        lg={5.5}
                        value={value.email}
                        readOnly={value.id ? true : false}
                        onChange={event => setValue(prev => ({ ...prev, email: event.target.value }))}
                        label='Email'
                    />
                    <TextField
                        required
                        lg={5.5}
                        value={value.phone}
                        onChange={event => setValue(prev => ({ ...prev, phone: event.target.value }))}
                        label='phone'
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

export default AddUsers;
