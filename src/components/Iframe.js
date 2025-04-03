import { Fragment, useCallback, useEffect, useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { REQUEST_ACTIONS, sendRequest, setCookie, getCookie } from '../utils/Communicator';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


export const IFrame = (props) => {
   // console.log(props.iframe)
   const iframe = function () {
        return {
            __html: props.iframe
        }
    }
    return (
        <div>
            
            <div dangerouslySetInnerHTML={iframe()} />
        </div>
    );
}

export default IFrame;