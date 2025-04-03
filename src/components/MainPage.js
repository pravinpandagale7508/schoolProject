import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Tracker from '../shipTracker/Tracker';
import './MainPage.scss';
import { REQUEST_ACTIONS, sendRequest } from '../utils/Communicator';

export const MainPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userInfo, setUserInfo] = new useState(null);

  const getUserInfo = attrName => {
    if (userInfo !== null) {
      let userInfoObj = JSON.parse(userInfo);
      return userInfoObj[attrName];
    }
    return '';
  };

  const getUserInfoJson = () => {
    if (userInfo !== null) {
      let userInfoObj = JSON.parse(userInfo);
      return userInfoObj;
    }
    return '';
  };
  if (location.state && location.state.isLogout === true) {
    // For logout/from new login, Should invalidate the user info object.
    setUserInfo(null);
    location.state.isLogout = false;
    location.state.isNewUser = false;
  }

  if (userInfo === null) {
    // Get the user info from server.
    // If the server returned 401, redirect to Login the page.
    sendRequest('/api/loggedInUser', REQUEST_ACTIONS.POST, '', {
      successCallback: response => {
        setUserInfo(JSON.stringify(response));
        let userInfoObj = JSON.parse(JSON.stringify(response));
        let authorities = userInfoObj['authorities'];
        if (authorities && authorities[0].authority !== 'Customer' && location.pathname.indexOf('/home') === -1) {
          navigate('/home', { state: { userInfo: userInfo } });
        } else if (authorities && authorities[0].authority === 'Customer' && location.pathname.indexOf('/settings/Tracker') === -1 && location.pathname.indexOf('/customerOrders') === -1) {
          navigate('/settings/Tracker', { state: { userInfo: userInfo } });
        }
      },
      failedCallback: error => {
        if (error.status === 401 || error.status === 403) {
          setUserInfo('');
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        }
      },
    });
  }
  const doLogout = () => {
    sendRequest('/api/logout', REQUEST_ACTIONS.POST, null, {
      successCallback: response => {
        navigate('/login');
      },
      failedCallback: error => { },
    });
  };

  const StyledMenu = styled(props => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      minWidth: 180,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
    },
  }));
const IlTime = new Date().toLocaleString("en-EN", {timeZone: 'Israel'}).split(",");
const NlTime = new Date().toLocaleString("en-EN", {timeZone: 'Europe/Amsterdam'}).split(",");

const Il_Time = new Date().toLocaleString("en-EN", {timeZone: 'Israel'});
const Nl_Time = new Date().toLocaleString("en-EN", {timeZone: 'Europe/Amsterdam'});

const IL_Time = new Date(Il_Time);
const NL_Time = new Date(Nl_Time);

const toolbarStyle = {
    minHeight: 50,
    color: 'black',
    width: 'calc(100vw - 300px)',
    justifyContent: 'space-between'
  };

  return (
    <React.Fragment>
      {userInfo && (
        <div>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhn_BbDBWN2S6efDQ9AL5lG5uYcxuFe64" />
          <AppBar
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
            
            {getUserInfo('authorities') && getUserInfo('authorities')[0].authority != 'Customer' ? (
              <Toolbar style={toolbarStyle}>
  {/*
      {new Date().toLocaleString("en-EN", {timeZone: 'Israel', format: 'dd-mmm-yy'}) + " IL: " + new Date().getHours()+":"+new Date().getMinutes()+ + ", NL: " + new Date().toLocaleString("en-EN", {timeZone: 'Europe/Amsterdam', format: 'hh-MM'})}
  {IlTime[0] + ", NL:" + NlTime[1] + ", IL:" + IlTime[1]}
  */}
                {IlTime[0] + ", NL:" + IL_Time.getHours()+":"+IL_Time.getMinutes() + ", IL:" + NL_Time.getHours()+":"+NL_Time.getMinutes()}
                <TextButton sx={{ mr: 6 }}>
                  <Link to='/home' style={{ textDecoration: 'none', fontSize: 17, color: '#1976d2' }}>
                    Orders
                  </Link>
                </TextButton>
                <TextButton sx={{ mr: 6 }} onClick={handleClick} style={{ fontSize: 17, color: '#1976d2' }}>
                  Settings
                </TextButton>
              </Toolbar>
            ) : <Toolbar style={toolbarStyle}/>}
            
          </AppBar>
          <div className='logged-in-user-container'>
            <div className='dropdown'>
              Welcome,
              <button className='dropbtn'>{getUserInfo('username')}</button>
              <div className='dropdown-content'>
                <span onClick={doLogout}>Logout</span>
              </div>
            </div>
          </div>
          <StyledMenu
            id='demo-customized-menu'
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClick={handleClose}>

            
            <Link to='/settings/Tracker' style={{ textDecoration: 'none', color: 'inherit', fontSize: 17 }}>
              <MenuItem onClick={handleClose}>Tracker</MenuItem>
            </Link>
          </StyledMenu>
          <Routes>
           

            <Route exact path='/settings/Tracker' element={<Tracker />} />
            ) : null}
          </Routes>
        </div>
      )}
    </React.Fragment>
  );
};

export default MainPage;
