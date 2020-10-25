// author Kaito Imai

import React, {useState, useEffect ,useRef, Fragment,useCallback} from 'react'
import { Waypoint } from 'react-waypoint';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetPosts from '../api/getPostAPI'
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Fab from '@material-ui/core/Fab';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';

import { red } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Maintheme} from './theme';
import {PostForm} from '../hooks/useUser';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import getAnimal from '../api/getAnimal' 
import DoneIcon from '@material-ui/icons/Done';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { useHistory } from "react-router-dom";

import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    createMuiTheme,} from '@material-ui/core/styles';






const useStyles = makeStyles((theme) => ({
    root: {
    marginTop: "10%",
    marginLeft: "10%",
    marginRight: "10%",
      maxWidth: "80%",
    },
    input: {
        display: 'none'
    },
    paper: {
        paddingBottom: 50,
      },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    MuiFabroot:{
        // box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);

    },
    form:{
      marginTop:"30%",
    },
    avatar: {
      
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
      },
      appBar: {
        top: 'auto',
        bottom: 0,
        paddingLeft: "15%",
        paddingRight: "15%",

      },
      grow: {
        flexGrow: 1,
      },
      fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        boxShadow:" 0px 5px 8px 1px rgba(217, 125, 84, 0.57)",

        right: 0,
        margin: '0 auto',
      },cardMedia: {
        backgroundColor:"#d97d5438",
        paddingTop: '50.25%',
        borderRadius: '0.5em',
        margin: '3%',
        marginTop: '3%',
        // position: 'absolute',
        // width: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
    },
    form_input: {

    },
  }));
const Home = () => {
    const {
        handleContentChange, 
        handleSubmit, handleImgChange,handl_user_idChange, 
        state
    } = PostForm()

    // const onChange = e => {
    //     console.log(state.password);
    //     console.log(state.email);

    //     handleContentChange(e)
    //     setErrorMessage(null)




    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [Posts, setPosts] = useState([]) // レンダーするpostデータ
    const [page, setpage] = useState(1) //ページ番号
    const [files, setFiles] = useState([]);
    var Post_data = {
        images: [],
        content: []
    };
    // postダイアログのsate
    const [open, setOpen] = React.useState(false);
    const onChange = e => {
        handleContentChange(e.target.value)
        // Post_data.content= e.target.value

    }
    const onSubmit =(e)=> {
        e.preventDefault();
        // handl_user_idChange(getAnimal().user_id)
        console.log(state);
        handleSubmit(state)
        handleToMain()
    };

    // 画像アップロード
    const handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('image') ? 'images' : 'videos';
        setFiles(URL.createObjectURL(target.files[0])) // blob取り込み

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            handleImgChange(e.target.result);

            // setimage(e.target.result);
            // Post_data.images=e.target.result

        }


    };

    const onEnter =  async() => {
        setLoading(true)
        console.log("onChange");
        setpage(page+1)
        console.log(page);
        GetPosts({page})
        .then((u) => {
        setPosts(Posts.concat(u.hits))
        console.log(Posts);
        // setPosts()
            setLoading(false)
        })
        .catch((e) => {
            throw new Error(e)
        })
    }
    
    useEffect( async() => {
        setLoading(true)
        GetPosts({page})
        .then((u) => {
            setPosts(u.hits)
            setLoading(false)
        })
        .catch((e) => {
            throw new Error(e)
        })
    }, [])
    const history = useHistory();

    const handleToProf = () => {
      history.push('/viewProfile')
    }
    const handleToMain = () => {
      history.push('/main')
    }
    // const data =getAnimal() dom.map(u => ( <User {...u} /> ))
    // console.log(posts);
    return (
        <div>
            <MuiThemeProvider theme={Maintheme}>
            <   AppBar position="fixed" >
                <Typography  position="fixed" className={classes.text} variant="h5" gutterBottom  >
                    Animar
                </Typography>
                </   AppBar>
                {loading ? (<h1>Loading</h1>) : <div></div>}
                <Grid container  alignItems="center" justify="center" className={classes.form} >
                <Grid item xs={11} >
                  <Paper square className={classes.paper}>

                    
                <Grid  item >
        
                  <Fragment>
                  <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-photo"
                      onChange={handleCapture}
                      type="file"
                  />
                  <label htmlFor="icon-button-photo">
                  <CardMedia
                    className={classes.cardMedia}
                    image={files}
                    // title="Paella dish"
                /> 
                      <IconButton color="secondary" component="span">
                        
                          <PhotoCamera />
                      </IconButton>
                  </label>
              </Fragment>
                  
                  </Grid>

                <form    className={classes.form_input}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="content"
                    label="Your tought here"
                    type="content"
                    value={state.content} 
                    onChange={onChange}
                    placeholder="Your tought here"
                    fullWidth
                  />
 

              </form>
            </Paper>

              </Grid>
              </Grid>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                    <Link href="#" onClick={handleToMain}>
                            <IconButton style={{color:"#8E8484"}} aria-label="open drawer"  >
                                <HomeIcon />
                            </IconButton>
                        </Link>
                        <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={onSubmit} >
                            <DoneIcon />
                        </Fab>
                        <div className={classes.grow} />

                        <Link href="#" onClick={handleToProf}>
                        <IconButton  style={{color:"#8E8484"}} >
                            <PetsIcon />
                        </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>
        </div>
    )
}

export default Home 
