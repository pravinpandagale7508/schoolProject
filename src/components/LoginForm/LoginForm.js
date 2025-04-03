import { Fragment, useCallback, useEffect, useState } from 'react';
import React from 'react';
import './login.scss';
import { REQUEST_ACTIONS, sendRequest, setCookie, getCookie } from '../../utils/Communicator';
import { useDispatch, useSelector } from 'react-redux';
import { setAdmin } from '../../reducers/admin-reducers/AdminSlicer';
import { snackbarToggle } from '../../reducers/snackbarSlicer';
import { URL, LANGUAGES } from '../../constants/global-constants';
import {  logOutSystem,login,addAdmin } from '../Admins/AdminHandler'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AddAdmin from '../Admins/AddAdmin';
import { Dialog,Snackbar } from '../../style-guide';
export const LoginForm = (props) => {
    const { admin } = useSelector(state => state.admin);
    const [userName, setUserName] = new useState("pravin");
    const [password, setPassword] = new useState("asdf1232ds");
    const [hasError, setHasError] = new useState(false);
    const [session, setSession] = new useState(getCookie("NBO_SESSION_ID"));
	const dispatch = useDispatch();
    const failedCallback = useCallback(message => dispatch(snackbarToggle({ type: 'error', message })), [dispatch]);

    const [openAdminModal, setOpenAdminModal] = useState(false);
    const onHandleOpenModal = () => {
        setOpenAdminModal(true);
    };
    const onHandleCancelModal = () => setOpenAdminModal(false);
    
    const doLogin = () => {
        login(dispatch, userName, password, setHasError,()=>{
            props.setIsActive(true)
        });
    }
    const register = () => {
        addAdmin(dispatch, userName, password, setHasError);
    }
    const logOut = () => {
        setHasError(false);
        logOutSystem(dispatch, session, setHasError)        
    }
   

    const thidden = props.hidden;

    const keyPressed = (e) => {
      if(e.keyCode === 13){
        doLogin();
      }
    }
    return (
        <div style={{width:"100%",height:"100%"}}>
            {!thidden&&<div className="login-main-container" hidden={thidden}>
                <div className="login-container">
                    <div className="login-title">
                        <div className="login-title-strong"></div>
                        <div className="login-title-sub">Welcome To New Era. Enjoy...</div>
                    </div>
                    <div className="login_form"  >
                        <div className="login-label">Username</div>
                        <input type="text" className="login-input" onChange={e => setUserName(e.target.value)} />
                        <div className="login-label password" >Password</div>
                        <input type="password" className="login-input" onKeyDown={e => keyPressed(e)} onChange={e => setPassword(e.target.value)} />
                        <Box sx={{ flexGrow: 1,marginTop:4,marginLeft:4 }}>
                            <Grid container spacing={2} justifyContent={'space-around'}>
                                <Grid size={12}>
                                <Button variant="contained" onClick={doLogin}>Login</Button>
                                </Grid>
                                {/* <Grid size={4}>
                                <Button variant="contained" onClick={()=>{onHandleOpenModal()}}>Register</Button>
                                </Grid> */}
                                
                            </Grid>
                            </Box>
                        <div>
                            
                            
                            
                        </div>
                    </div>
                    <div className="login-error">{hasError && "Invalid login!"}</div>
                    {openAdminModal && (
                <Dialog maxWidth='sm' open={openAdminModal} title={`NEW USER`} onHandleCancel={onHandleCancelModal}>
                    <AddAdmin onHandleCancel={() => setOpenAdminModal(false)} id={null} />
                </Dialog>
            )}
                </div>
            </div>}
        </div>
    );
}

export default LoginForm; 