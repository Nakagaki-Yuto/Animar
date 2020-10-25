// author Kaito Imai
import React from 'react'
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';


//  override textfiled

const useStylesReddit = makeStyles((theme) => ({
    root: {
      border: 'None',
      "& $notchedOutline": {   //add this nested selector
        borderWidth: "0",
     },

     "&$cssFocused $notchedOutline": {
        borderWidth: "0",
     },
      overflow: 'hidden',
      borderRadius: 14,
      backgroundColor: '#fcfcfb',
    //   transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
        
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
      "& $MuiOutlinedInput-root.Mui-focused fieldset" :{
        borderColor: "FFF",

      }
    },
    focused: {},
  }));
function RedditTextField(props) {
const classes = useStylesReddit();

    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
}


export default RedditTextField;
