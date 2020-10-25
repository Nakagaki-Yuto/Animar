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
import RedditTextField from './RedditTextField'
import { useHistory } from "react-router-dom";
import postHuman,{postAnimal}  from '../api/postUserAPI'

import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';

const HumanFormUI= ({signup_style,humanSubmit}) =>  {
    const classes = signup_style();
    const history = useHistory();
    const {
        handleChange, 
        handleSubmit, 
        state, 
    } = HumanForm()

    const onChange = e => {
        console.log(state.password);
        console.log(state.email);

        handleChange(e)
        setErrorMessage(null)
    }
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(state)
        humanSubmit() // 親子コンポーネントのstate処理
    } 
    const handleToLogin = () => {
        //postHuman(JSON.parse(localStorage.getItem('userinfo')))
        //localStorage.removeItem('userinfo')
        history.push('/login')
      }
    // const onSubmit = data => console.log(data);
    const [errorMessage, setErrorMessage] = useState()
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [values, setValues] = React.useState({
        showPassword: false,//ToDO I want to  togle show pass
        showQestion:false, //To show "Are you human or Animal "
        showAnimalSignUp:false, //To show " SignUp of Animal "
    });

    return(
    <div className={classes.paper}>

    <Typography   className={classes.animar} color="secondary" component="h1" variant="h4">
    animar
    </Typography>
    <Typography className={classes.guide} color="secondary" component="h2" variant="h5">
    Enter your
    </Typography>
    <Typography  color="secondary" component="h2" variant="h4">
    email and password
    </Typography>
    
    
    <form  onSubmit={onSubmit} className={classes.form,classes.sign_in_card} >
        <Grid container spacing={2}>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                required={true}
                fullWidth
                name="mail"
                label="email"
                type="name"
                id="name"
                autoComplete="mail"
                value={state.email} 
                onChange={onChange} 
                placeholder="mail"
                validators={['mail']}
                // helperText="Incorrect entry."
                            /> 
            </Grid>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                required={true}
                fullWidth
                name="user_id"
                label="username"
                type="name"
                id="name"
                autoComplete="user_id"
                value={state.user_id} 
                onChange={onChange} 
                placeholder="user_id"
                validators={['user_id']}
                // helperText="Incorrect entry."
                            /> 
            </Grid>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                required={true}
                fullWidth
                id="standard-adornment-password"
                type= 'password'
                type={values.showPassword ? 'text' : 'password'}
                label="password"
                name="password"
                // color="textPrimary"
                // autoComplete="password"
                value={state.password}
                onChange={onChange}
                //TODO パスワードの表示切り替え（CSSの変更必須）
                // InputProps={{
                //     endAdornment: (
                //       <InputAdornment position="end">
                //         <IconButton
                //           aria-label="Toggle password visibility"
                //         //   onClick={this.handleClickShowPassword}
                //         >
                //           {/* {this.state.showPassword ? <Visibility /> : <VisibilityOff />} */}
                //         </IconButton>
                //       </InputAdornment>
                //     ),
                //   }}
                // placeholder="password"
                // endAdornment={
                // <InputAdornment position="end">
                //     <IconButton
                //     aria-label="toggle password visibility"
                //     onClick={handleClickShowPassword}
                //     onMouseDown={handleMouseDownPassword}
                //     >
                //     {values.showPassword ? <Visibility /> : <VisibilityOff />}
                //     </IconButton>
                // </InputAdornment>
                // }
            />
            </Grid>
        </Grid>
        <div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
        >
            Next
        </Button></div>
        <Typography color="inherit"component="h5" variant="h5">
        You already have an account? 
        <Link
        href="#" onClick={handleToLogin}
        
        >
        Login
        </Link>
        
    </Typography>
    </form>
    </div>) }
export default HumanFormUI;
