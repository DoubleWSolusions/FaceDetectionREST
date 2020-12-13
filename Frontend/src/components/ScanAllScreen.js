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



function ScanAllScreen (props) {
    const classes = useStyles();
    const [state, setState] = useState({
        url:'',
        profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        profileImg2:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });
    const [imgState, setImgState] = useState({
        name:'',
        imageAfter:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });


    const handleChange = (e) => {
        setState({
                [e.target.id]: e.target.value
        })
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('url', state.url);
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
            axios({
                    method: 'get',
                    dataType: 'json',
                    url: 'http://fb7de35755e1.ngrok.io/api/detection4/?url=' + state.url,
                
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
                        <Grid item xs={6} className={classes.xsGrid}>
                        <div className={classes.label} >                 
                        <form >
                            <h2>Podaj url zdjęcia</h2>
                            <p>
                                <input type="text" placeholder='Url' id='url' value={state.url} onChange={handleChange} required/>
                            </p>               
                        </form>
                        <Button onClick={handleGet} className={classes.margintop}>Przeprowadź detekcję</Button>
                        </div>


                        </Grid>
                        <Grid item xs={6} className={classes.xsGrid}>
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
            maxWidth: 300,
            maxHeight: 300,
            alignItems: 'center'
           
        },
        label:{
            marginTop: '1rem',
            textAlign: 'center',
        },
        margintop:{
            marginTop: '1rem',
        },
        xsGrid:{
            maxWidth: '50%',
            flexBasis: '50%',
            justifyContent: 'center',
            alignItems: 'center',
            /* text-align: center; */
            direction: 'collumn',
            display: 'flex',
        },
      }));
  export default ScanAllScreen;