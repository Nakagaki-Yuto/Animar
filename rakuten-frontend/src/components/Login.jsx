import React, {useState, useEffect} from 'react'
import useLogin from '../hooks/useLogin'
import { useHistory } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import themeSignUp,{signup_style} from './theme'
import RedditTextField from './RedditTextField'

import LoginUI from './LoginUI'

import { MuiThemeProvider } from '@material-ui/core/styles';

const Login = () => {
    const {
        handleChange, 
        handleSubmit, 
    } = useLogin()


    
    return (
        <Container component="main" maxWidth="false"> 
        <MuiThemeProvider theme={themeSignUp}>
        <CssBaseline />
            <LoginUI signup_style={signup_style} handleSubmit={handleSubmit} />
        </MuiThemeProvider>
        </Container>
    )
}

export default Login 