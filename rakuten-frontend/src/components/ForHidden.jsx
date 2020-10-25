// author Takumi Katayama
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider } from '@material-ui/core/styles';
import themeSignUp,{ error_page } from './theme'
import Typography from '@material-ui/core/Typography'

const ForHidden = () => {
    const classes = error_page();
    return (
        <Container component="main" maxWidth="false"> 
            <MuiThemeProvider theme={themeSignUp}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography   color="secondary" component="h1" variant="h2">
                        403
                        <br />
                        For hidden
                    </Typography>
                    <img src={`${process.env.PUBLIC_URL}/neko.png`} className={classes.img} />
                </div>
            </MuiThemeProvider>
        </Container>
    )
}

export default ForHidden
