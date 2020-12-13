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



function ChooseFileScreen (props) {
    const classes = useStyles();

    const [state, setState] = useState({
        nazwa:'',
        profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        profileImg2:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });


    const handleChange = (e) => {
        setState({
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
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4} className={classes.gridCenter}>
                        <Card className={classes.cardStyle}>
                            <CardContent>
                                <Typography color="textSecondary">               
                                    <img src={state.profileImg2} alt="logo" id="img" height="100%" width="100%"/>
                                </Typography>
                            </CardContent>
                        </Card>
                        <div className={classes.label} >                 
                        <form onSubmit={handleSubmit}>
                            <p>
                                <input type="text" placeholder='Nazwa' id='nazwa' value={state.nazwa} onChange={handleChange} required/>
                            </p>
                            <p>
                                <input type="file" id="input" accept="image/*" onChange={imageHandler} required/> 
                            </p>
                            <input type="submit" value="Wyślij" />
                        </form>
                        </div>

                        </Grid>
                        <Grid item xs={4}></Grid>
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
            textAlign: 'left',
        },
        margintop:{
            marginTop: '7rem',
        },
        xsGrid:{
            justifyContent: 'center',
            alignItems: 'center',
            /* text-align: center; */

        },
      }));
  export default ChooseFileScreen;