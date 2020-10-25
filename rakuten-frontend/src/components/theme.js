// author Kaito Imai
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
import GlobalStyle from "./globalstyle";
import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

const font = "'Lato', sans-serif"; 
// SignUp Theme not base theme
const themeSignUp = createMuiTheme({
    palette: {
    primary: {
        light: '#87BCBF',
        main: '#D97D54',
        dark: '#324755',
        contrastText: '#fff',
        },
        secondary: {
        light: '#FFFFFF',
        main: '#FFFFFF',
        dark: '#1B1C20',
        contrastText: '#000',
        },
    textPrimary:{ default: "#fff"},
    textSecondary:{ default: "#324755"},
      background: {
        default: "#D97D54"
      },
      text: {
        primary: "#324755",
        // secondary: "#ffffff",
      },
      overrides: {
        MuiOutlinedInput: {
            root: {
                '& $notchedOutline': {
                    border: '0px',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    border: '0px',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        border: '0px',
                    },
                },
                '&$focused $notchedOutline': {
                    border: '0px',
                    borderWidth: 0,
                },
            },
        },}
 
 
  }});
// Main Theme 
const Maintheme = createMuiTheme({
    palette: {
    primary: {
        light: '#87BCBF',
        main: '#FFFFFF',
        dark: '#324755',
        contrastText: '#D97D54',
        },
        secondary: {
        light: '#FFFFFF',
        main: '#D97D54',
        dark: '#1B1C20',
        contrastText: '#FFFFFF',
        },
        textPrimary: {
        default: "#fff"
        ,fontFamily:" 'Roboto' ,'Semi-bold ",
        },
        textSecondary: { default: "#324755"  
        ,fontFamily: " 'Roboto' ,'Semi-bold ",
      
      },
        background: {
          default: "#FFFFFF"
        },
      text: {
        primary: "#324755",
        // secondary: "#ffffff",
      },
      overrides: {
        MuiOutlinedInput: {
            root: {
                '& $notchedOutline': {
                    border: '0px',
                },
                '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                    border: '0px',
                    // Reset on touch devices, it doesn't add specificity
                    '@media (hover: none)': {
                        border: '0px',
                    },
                },
                '&$focused $notchedOutline': {
                    border: '0px',
                    borderWidth: 0,
                },
            },
        },}
 
 
  }});

// CSS
const signup_style = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(3),

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#D97D54'

    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#FFF'
    },    input: {
      display: 'none'
  },
    animar: {
    marginBottom: theme.spacing(5),
    },
    guide: {
        marginTop: theme.spacing(10),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    
    text_filed: {
        borderWidth: '0',
        border: '0',
    },
    submit: {
        borderWidth: '0',
        border: '0',
        margin: theme.spacing(3, 0, 2),
        borderRadius: 14,

        boxShadow:"0px 3px 1px -2px rgba(0,0,0,0.04), 0px 2px 2px 0px rgba(0,0,0,0.04), 0px 1px 5px 0px rgba(0,0,0,0.04)",
    },
    sign_in_card: {
        marginTop: theme.spacing(3),
        width: "100%",
        background: "rgba(255,255,255,0.8);",
        paddingTop:"10%",
        paddingBottom:"10%",
        borderRadius: "4%",
        borderWidth: '0',

        boxShadow: "0 2px 5px #ccc",
        '& > div': {
            padding:" 5%"
          },
        //   '& > Button': {
        //     padding:" 5%"
        //   },
          
      },
      sign_in_card_content: {
        padding:" 20px"
      }
  }));


const error_page = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    alignItems: 'center',
    backgroundColor: '#D97D54'
  },
  img: {
    marginTop: theme.spacing(10),
    width: "50vw"
  }
}))
export default themeSignUp;
export  {signup_style,Maintheme, error_page};
