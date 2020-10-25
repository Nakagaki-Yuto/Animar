// author Kaito Imai

// 一部 Takumi Katayama
import React, {useState, useEffect ,useRef, useCallback } from 'react'
import {useHistory} from 'react-router-dom'
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
import AllPost from '../api/getPostAPI'
import { CreateLike, DeleteLike } from '../api/postLike'

import useGetUser from '../hooks/useGetUser'
import getAnimal from '../api/getAnimal'

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
import {Maintheme} from './theme';
import {PostForm} from '../hooks/useUser';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Link from '@material-ui/core/Link';

import {
    fade,
    MuiThemeProvider,
    ThemeProvider,
    withStyles,
    createMuiTheme,} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    marginTop: "20%",
    marginBottom: "20%",
    marginLeft: "10%",
    marginRight: "10%",
      maxWidth: "80%",
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
    icons:{

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
      },
  }));
const Home = () => {
    const {
        handleContentChange, 
        handleSubmit, handleImgChange,handl_user_idChange, 
        state
    } = PostForm()

    const handleToProf = () => {
      history.push('/viewProfile')
    }
    const handleToPost = () => {
      history.push('/Post')
    }
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [Posts, setPosts] = useState([]) // レンダーするpostデータ
    const [page, setpage] = useState(1) //ページ番号

    var Post_data = {
        images: [],
        content: []
    };
    // postダイアログのsate
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      // setOpen(true);
      handleToPost()
    };
    const handleClose = () => {
      setOpen(false);
    };
    const onChange = e => {
        handleContentChange(e.target.value)
        // Post_data.content= e.target.value
    }
    const [error, setError] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const user = useGetUser()
    let history = useHistory()

    const handleToLogout = () => {
        localStorage.clear()
      history.push('/signup')
    }
    
    // author Takumi Katayama ここから
    useEffect(() => {
        const p = async () => {
            setLoading(true)
            // GetPosts({page})
            AllPost()
            .then((p) => {
                setPosts(p)
                setLoading(false)
            })
            .catch((e) => {
                history.push('/error')
            })
        }
        p()
    }, [])

    const gooded = async (post) => {
        const l = []
        post.map(i => {
            l.push(i)
        })
        return l
    }

    // TODO 2回連続いいねがされた時の制限の掛け方を考える
    const _renderItems = () => {
        const domain = 'http://localhost:8000'
        const incrementGood = (id) => { 
            Posts[id-1].like += 1
            Posts[id-1].is_liked = true
        }
        const decrementGood = (id) => { 
            Posts[id-1].like -= 1
            Posts[id-1].is_liked = false
        }
        const handleGood = async (id, good) => {
            const uid = user.id
            const goodRequest = good 
            ? DeleteLike(id, uid) 
            : CreateLike(id, uid)
            goodRequest
            .then(() => {
                good ? (
                    decrementGood(id)
                ) : (
                    incrementGood(id)
                )
                gooded(Posts)
                .then((g) => {
                    setPosts(g)
                })
                .catch(e => {
                    history.push('/error')
                })
            })
            .catch((e) => {
                history.push('/error')
            })
        }

        return Posts.map(function(p) {
            // TODO ここをtrue/falseに変更する
            const goodYet = p.is_liked ? true : false 
          return (
              <div >
            <Card className={classes.root} key={p.id}>
                <CardMedia
                    className={classes.media}
                    image={domain+p.image}
                />
                <CardContent>
                
                <Grid container spacing={2}>
                <Grid item xs={3}>
                <Avatar aria-label="recipe" src={p.user_id} className={classes.avatar}>
                        {p.user_id.slice(0,1)}
                    </Avatar></Grid>
                <Grid item xs={9}>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {p.content}
                    </Typography></Grid>

                    </Grid>

                </CardContent>
                <CardActions disableSpacing className={classes.icons}>
                <Grid item xs/>
                    {goodYet ? (
                        <IconButton aria-label="add to favorites" color="secondary" onClick={() => handleGood(p.id, goodYet)}>
                            <FavoriteIcon />
                            {p.like}
                        </IconButton>
                    ) : (
                        <IconButton aria-label="delete to favorites" onClick={() => handleGood(p.id, goodYet)}>
                            <FavoriteIcon />
                            {p.like}
                        </IconButton>
                    )}
                    
                    <IconButton aria-label="share">
                    <ShareIcon />
                    </IconButton>
                </CardActions>
                
                </Card>
                        </div>

                    );
                    });
      }
    // ここら辺まで Takumi Katayama
    
    
    // const data =getAnimal() dom.map(u => ( <User {...u} /> ))
    // console.log(posts);
    return (
        <div>
            <MuiThemeProvider theme={Maintheme}>
            <Paper square className={classes.paper}>
            <   AppBar position="fixed" >

                <Typography  position="fixed" className={classes.text} variant="h5" gutterBottom  >
                    Animar
                </Typography>
                <Link href="#" onClick={handleToLogout}  color="inherit" >
                       logout
                        </Link>
                </   AppBar>
                <_renderItems />
                {loading ? (<h1>Loading</h1>) : <div></div>}
                
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <IconButton  color="inherit" aria-label="open drawer"  >
                            <HomeIcon />
                        </IconButton>
                        <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={handleClickOpen} >
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />
                        <Link href="#" onClick={handleToProf}>
                        <IconButton  style={{color:"#8E8484"}} >
                            <PetsIcon />
                        </IconButton>
                        </Link>
                    </Toolbar>
                </AppBar>
            </Paper>
            </MuiThemeProvider>
        </div>
    )
}

export default Home 
