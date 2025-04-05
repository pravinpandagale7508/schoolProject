import { Fragment, useCallback, useEffect, useState } from 'react';
import React from 'react';


import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import { BrowserRouter as Router, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { REQUEST_ACTIONS, sendRequest, setCookie, getCookie } from '../utils/Communicator';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LoginForm } from './LoginForm/LoginForm';
import { snackbarToggle } from '../reducers/snackbarSlicer';
import { URL_DATA, LANGUAGES } from '../constants/global-constants';
import { resetAdminState, setCurrentPage, setIsFtpActive, setFtpTimer } from '../reducers/admin-reducers/AdminSlicer';
import './MainPage.css';


import { AdminsTable } from './Admins/AdminsTable';
import { FaAngleDown, FaAngleUp, FaSignal } from "react-icons/fa";

const drawerWidth = 240;
const navItems = [{name:"Admins",linkUrl:"admin",id:0}];
export const LandingPage = (hidden) => {
    const { admin, currentPage, bMenu, isFtpActive, ftpTimer } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const failedCallback = useCallback(message => dispatch(snackbarToggle({ type: 'error', message })), [dispatch]);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        if (admin?.data?.accessToken) {
            setIsActive(true);
        }
    }, [dispatch, failedCallback, admin]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [bLogOut, setBlogOut] = useState(false);
   
    const [hasError, setHasError] = new useState(false);
    const logOut = () => {
        setHasError(false);
        setIsActive(false);
        let loginObj = { "sessionId": getCookie("SESSION_ID"), opcode: "logout" }
        if (getCookie("SESSION_ID") === "") {
            setIsActive(false);
            return;
        }
        sendRequest(URL.ADMIN_HANDLER, REQUEST_ACTIONS.POST, loginObj, {
            successCallback: (response) => {
                setCookie("SESSION_ID", "", 30);
                setHasError(false);
                setIsActive(false);
                // dispatch(resetAdminState(response))
                // dispatch(setAdmin(response))
            },
            failedCallback: error => {
                setHasError(true);
            }
        });
    }
    const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
      Welcome,{admin?.data?.username}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
            <Link to={item.linkUrl} style={{ textDecoration: 'none', color: 'inherit', fontSize: 17 }}>
            <ListItemText primary={item.name} />
        </Link>
             
            </ListItemButton>
          </ListItem>

          
        ))}
      </List>
    </Box>
  );

  const container =undefined;
    return (
        <React.Fragment>
            
           {isActive&& <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'block' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
             Project
          </Typography>
          
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3,width:'100%' }}>
        <Toolbar />
        <Routes>
        <Route exact path='/*' element={<AdminsTable />} />
                    <Route exact path='/admin' element={<AdminsTable />} />
                </Routes>
      </Box>
    </Box>}

            <LoginForm setIsActive={setIsActive} hidden={isActive} />
            <div hidden={!isActive}>
                {/* <AppBar
                    position='static'
                    elevation={0}
                    className='appbar'
                    style={{
                        marginBottom: 20,
                        borderBottom: '2px solid #CCCCCC',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>

                    {isActive ? (
                        <Toolbar style={toolbarStyle}>
                            { }
                            {"Date: " + IlTime[0] + ", Time: " + new Date().getHours() + ":" + new Date().getMinutes()}
                            <div style={{ right: '45%' }}> Current Page: {currentPage}</div>
                            <TextButton sx={{ mr: 6 }} onClick={handleClick} style={{ fontSize: 17, color: '#1976d2' }}>
                                Menu
                            </TextButton>
                            
                        </Toolbar>
                    ) : <Toolbar style={toolbarStyle} />}
                    <div className='logged-in-user-container' >
                        <div className='dropdown'>
                            Welcome,
                            <button onClick={toggleLogOut} className='dropbtn'>{admin.username}</button>
                            {<div className='dropdown-content'>
                                <span onClick={logOut}>Logout</span>
                            </div>}
                            
                        </div>
                        
                    </div>
                    <div className='logged-in-user-container' style={{top:'15px',right:'10px'}}>
                        <FaSignal title={isFtpActive} style={{ color: isFtpActive === 'FTP Working.' ? 'green' : 'red', height: '22px', width: '25px' }} />
                        </div>
                </AppBar> */}
                
            </div>
        </React.Fragment>
    );
}

export default LandingPage;