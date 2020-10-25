// author Kaito Imai

import React, {useEffect, Fragment,useState } from 'react';
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
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import RedditTextField from './RedditTextField'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {

    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

const AnimalFormUI= ({signup_style}) =>  {
    const history = useHistory();
    const handleToFeed = () => {
      //history.push('/main')
    }
    const classes = signup_style();
    const {
        handleChange, 
        handleSubmit, 
        state,handleImgChange,
        handleChangeNum,
    } = AnimalForm()
    

    const onChange = e => {

        handleChange(e)
    }
    const onChangeNum = e => {

        handleChangeNum(e)
    }
    const onSubmit = e => {
        console.log("onSubmit");
        e.preventDefault()
        handleSubmit(state)
        handleToFeed()
    } 
    useEffect(() => {
        console.log(state);
        }, [state]);


    // アバター画像にプレビューを表示するために　filesにURLを取り込むためのもの
    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState(false);
    // const handleSave = (acceptedFiles) => {
    //     console.log('handleSave');
    //     // previewの追加
    //     setFiles(acceptedFiles.map(
    //     file => Object.assign(file, {
    //     preview: URL.createObjectURL(file)
    //     })));
    //     console.log('files', files.map((file, index) => (file.preview)));

    // }
    // 画像アップロード
    const handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        console.log();
        const name = target.accept.includes('image') ? 'images' : 'videos';
        setFiles(URL.createObjectURL(target.files[0])) // blob取り込み
        fileReader.readAsDataURL(target.files[0]); // blobをbase64へ

        fileReader.onload = (e) => {
            handleImgChange(e.target.result);

            // setimage(e.target.result);
            // Post_data.images=e.target.result

        }


    };



    return(
        <div className={classes.paper}>
        
        <Typography   className={classes.animar} color="secondary" component="h1" variant="h4">
            animar
        </Typography>
        <Typography className={classes.guide} color="secondary" component="h2" variant="h4">
            Welcome animal!
        </Typography>
        <Typography  color="secondary" component="h2" variant="h6">
            Please enter your animal info
        </Typography>

        {/* Avatar is usr profile image */}
        <Avatar src={files} className={classes.avatar}>
        </Avatar>


        <form  onSubmit={onSubmit} className={classes.form,classes.sign_in_card} >
            {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Add Image
            </Button> */}
            {/* DropzoneDialog is avatar image uploder */}
            <Fragment>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-photo"
                    onChange={handleCapture}
                    type="file"
                />
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
            </Fragment>
            {/* <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText={"cancel"}
                submitButtonText={"submit"}
                maxFileSize={5000000}
                filesLimit={1}
                open={open}
                onChange={(files) => {
                    // console.log('Files:', files[0]);
                    handleSave(files)
                    setOpen(false)
                    handleImgChange(files.map((file, index) => (file.preview)))

                    }
                }
                onClose={() => setOpen(false)}
                onSave={(files) =>{
                    // console.log('Files:', files[0]);
                    handleSave(files)
                    setOpen(false)
                    handleImgChange(files.map((file, index) => (file.preview)))

                    }} 
                showPreviews={true}
                showFileNamesInPreview={true}
            />*/}


            <Grid container spacing={2}>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                required={true}
                fullWidth
                name="name"
                label="name"
                type="name"
                id="name"
                autoComplete="Name"
                value={state.name} 
                onChange={onChange} 
                placeholder="Let us know your name"
                            /> 
            </Grid>
            <Grid item xs={12}>
                <RedditTextField
                    variant="outlined"
                    fullWidth
                    name="profile"
                    label="profile"
                    type="profile"
                    id="profile"
                    autoComplete="Location"
                    value={state.profile} 
                    onChange={onChange} 
                    placeholder="please let me know your profile" //todo
                                /> 
                </Grid>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                fullWidth
                name="sex"
                label="Gender"
                type="number"
                min="0"
                max="2"
                id="Gender"
                autoComplete="Gender"
                value={state.sex} 
                onChange={onChangeNum} 
                placeholder="Todo select box " //TODO select box
                            /> 
            </Grid>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                required={true}
                fullWidth
                name="type"
                label="Species"
                type="name"
                id="name"
                autoComplete="Species"
                value={state.type} 
                onChange={onChange} 
                placeholder="What kind of animal are you?"
                            /> 
            </Grid>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                fullWidth
                name="birthday"
                label="Birthday"
                type="name"
                id="name"
                autoComplete="Birthday"
                value={state.birthday} 
                onChange={onChange} 
                placeholder="eg:2000-04-01" //todo
                            /> 
            </Grid>
            <Grid item xs={12}>
            <RedditTextField
                variant="outlined"
                fullWidth
                name="residence"
                label="Location"
                type="name"
                id="Location"
                autoComplete="Location"
                value={state.residence} 
                onChange={onChange} 
                placeholder="please let me know your Location" //todo
                            /> 
            </Grid>

        </Grid>
            
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
        >
            Register
        </Button>

    </form>
    </div>) };

export default AnimalFormUI;
