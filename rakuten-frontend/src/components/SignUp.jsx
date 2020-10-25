// author Kaito Imai
import React, {useEffect, useState } from 'react';
import postUser from '../api/postUserAPI';
import HumanForm, {AnimalForm} from '../hooks/useUser';
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

import HumanFormUI from './HumanFormUI'
import AnimalFormUI from './AnimalFormUI'
import Qestion from './Qestion'
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,} from '@material-ui/core/styles';

const Main = () => {
    const classes = signup_style();
    // Toggle UI
    const [showQestion, setshowQestion] = useState(false)
    const [showHumanForm, setshowHumanForm] = useState(true)
    const [ShowAnimalForm, setShowAnimalForm] = useState(false)
    const [loading, setLoading] = useState(true) // Todo 遅延処理導入


    // To toogle state by child componets
    const humanSubmit = () => {
        setshowHumanForm(false)
        setShowAnimalForm(false)
        setshowQestion(true)

    } 
    const QestionSubmit = () => {
        setShowAnimalForm(true)
        setshowHumanForm(false)
        setshowQestion(false)

    } 

    // Here is 3 childs 
    // 1.HumanFormUI: To post email and pw
    // 2.Qestion: To ask the user if user is an animal or human
    //  if not animal --> redirect to /main
    // 3.AnimalFormUI: To post animal info

    return (


        <Container component="main" maxWidth="false"> 
        <MuiThemeProvider theme={themeSignUp}>
        <CssBaseline />
        <div className={classes.paper} > 

        {showHumanForm  ? ( <HumanFormUI signup_style={signup_style} humanSubmit={humanSubmit} /> ): null}

        {showQestion  ? ( <Qestion  signup_style={signup_style} QestionSubmit={QestionSubmit}  />) : null}

        {ShowAnimalForm  ? ( <AnimalFormUI  signup_style={signup_style}  />) : null}
        
        </div>
        </MuiThemeProvider>
        
        </Container>

    )
}

export default Main
