// author Kaito Imai
import React, {useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RedditTextField from './RedditTextField'

import { useHistory } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

const LoginUI= ({signup_style, humanSubmit}) =>  {
    const classes = signup_style();
    let history = useHistory()
    const {
        handleChange, 
        handleSubmit, 
        state, 
    } = useLogin()

    const onChange = e => {
        handleChange(e)
    }
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(state)
    } 
    
    const [values, setValues] = useState({
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
                name="user_id"
                label="user_id"
                type="text"
                id="user_id"
                autoComplete="user_id"
                value={state.user_id} 
                onChange={onChange} 
                placeholder="user_id"
                validators={['user_id']}
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
            Login
        </Button></div>

    </form>
    </div>) }
export default LoginUI;
