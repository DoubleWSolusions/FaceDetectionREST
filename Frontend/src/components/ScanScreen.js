import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';





function ScanScreen (props) {
    const classes = useStyles();
    const [stateGet, setStateGet] = useState({
        isLoading: true,
        users: [],
        error: null,

    })
    const [stateID, setStateID] = useState({
        id:'',
    });
    const [state, setState] = useState({
        nazwa:'',
        profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        profileImg2:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });
    const [imgState, setImgState] = useState({
        name:'',
        imageAfter:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });

    const [componentState, setComponentState] = useState({
        source: null,
    })

    const handleChange = (e) => {
        setState({
                [e.target.id]: e.target.value
        })
    };
    const handleChangeID = (e) => {
        setStateID({
                [e.target.id]: e.target.value
        })
    };

    

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            
            setState({
                profileImg2: reader.result,
                profileImg: e.target.files[0]
            })
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
    
    const handleImageChange = (e) => {
        setState({
            profileImg: e.target.files[0]
        })
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('name', state.nazwa);
        form_data.append('image', state.profileImg, state.profileImg.name);
        let url = 'http://fb7de35755e1.ngrok.io/api/image/';
        axios.post(url, form_data, {
            headers:{
                'content-type': 'multiport/form-data'
            }
        })
            .then(res =>{
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    const handleGet = (e) => {
        e.preventDefault();
        let url = 'http://fb7de35755e1.ngrok.io/api/detection3/?image=';
            axios({
                    method: 'get',
                    dataType: 'json',
                    url: url + stateID.id,
                
                }).then((response) => {
                console.log(response.data);
                setImgState({ 
                    imageAfter : response.data.image_url
                });

            }).catch((err=>{
                console.log(err);
            }))
    }

    const componentDidMount = () => {
        axios
          .get(
            'http://fb7de35755e1.ngrok.io/api/detection2/?image=dziadek',
            { responseType: 'arraybuffer' },
          )
          .then(response => {
            const base64 = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
            );
            setImgState({ imageAfter: "data:;base64," + base64 });
          });
        }


    const atStart = ()=>{
            axios.get('http://fb7de35755e1.ngrok.io/api/image/')
                .then((response) => {
                    setStateGet({
                        users: response.data,
                        isLoading: false
                    });
                }).catch((err=>{
                    console.log(err);
                }))
        }
    
    return (
        <div>
            
            <React.Fragment>
            <CssBaseline />
                <Container fixed className={classes.containerB}>
                    <Grid container spacing = {3} className={classes.textPanel}>
                        <Grid item xs={12}>
                        <hr className={classes.line}/>
                        <Link to="/Scan" className={classes.link}>
                                <Button className={classes.newButton}>Sprawdzanie detekcji</Button>
                            </Link>    
                            <Link to="/ScanAll" className={classes.link}>
                                <Button className={classes.newButton}>Detekcja po podaniu url</Button>
                            </Link>
                            <Link to="/ChooseFile" className={classes.link}>
                                <Button className={classes.newButton}>Wstaw zdjęcie</Button>
                            </Link>                         
                            <hr className={classes.line}/>
                        </Grid>
                        <Grid item xs={4}>
                        <div className={classes.label} >                 
                        <form>
                            <p>
                                <input type="text" placeholder='id' id='id' value={stateID.id} onChange={handleChangeID} required/>
                            </p>

                            <p>
                            <Button onClick={atStart} className={classes.margintop}>Pokaż zdjęcia w bazie</Button>
                            </p>
                            
                        </form>
                        {!stateGet.isLoading ? (
                            stateGet.users.map(user =>{
                                const { id, image_url } = user;
                                return (
                                    <div key={id}>
                                    <p>Id: {id}</p>
                                    <div>
                                    <img src={image_url} className={classes.cardStyle}/>
                                    </div>
                                    <hr/>
                                    </div>
                                );
                            })
                        ):(
                            <h3>Czekam na wczytanie</h3>
                        )

                        }
                    

                        </div>

                        </Grid>
                        <Grid item xs={4}>
                            <p>
                                <Button onClick={handleGet} className={classes.margintop}>Wyślij zapytanie o zdjęcie</Button>
                            </p>
                        </Grid>
                        <Grid item xs={4}>
                        <Card className={classes.cardStyle}>
                            <CardContent>
                                <Typography color="textSecondary">
                                    <img src={imgState.imageAfter} alt="logo" id="img" height="100%" width="100%"/>
                                </Typography>
                            </CardContent>
                        </Card>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>

        </div>

     )
    }
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        textPanel:{
            margin: theme.spacing(1),
            textAlign: "center",
            marginTop: "3%",
        },
        containerB:{
            textAlign: "center",
            fontFamily: "Arial",
            color: "#707070",
            width: "100%",
        },
        info:{
            fontSize: "1.7rem",
        },
        line:{
            display: 'block',
            height: '1px',
            border: '0',
            borderTop: '1px solid #ccc',
            margin: '0',
            padding: '0',
        },
        newButton:{
            backgroundColor: 'transparent !important' ,
            fontFamily: "Arial",
            padding: '1rem',
            "&:hover": {
                //you want this to be the same as the backgroundColor above
                color: blue,
            }
        },
        link :{
            textDecoration: 'none',
        },
        cardStyle:{
            minWidth: 125,
            minHeight: 125,
            maxWidth: 250,
            maxHeight: 250,
           
        },
        label:{
            marginTop: '1rem',
            textAlign: 'center',
        },
        margintop:{
            marginTop: '1rem',
        },
      }));
  export default ScanScreen;