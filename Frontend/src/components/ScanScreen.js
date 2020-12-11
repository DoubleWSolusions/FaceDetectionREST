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



function ScanScreen (props) {
    const classes = useStyles();
    const [state, setState] = useState({
        profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });
    const [imgState, setImgState] = useState({
        imageAfter:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    });
   

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2){
            
            setState({profileImg: reader.result})
          }
        }
        reader.readAsDataURL(e.target.files[0])
      };
    
    return (
        <div>
            <React.Fragment>
            <CssBaseline />
                <Container fixed className={classes.containerB}>
                    <Grid container spacing = {3} className={classes.textPanel}>
                        <Grid item xs={12}>
                            <hr className={classes.line}/>
                            <Link to="/" className={classes.link}>
                                <Button className={classes.newButton}>Wykrywanie twarzy</Button>
                            </Link>   
                            <hr className={classes.line}/>
                        </Grid>
                        <Grid item xs={4}>
                        <Card className={classes.cardStyle}>
                            <CardContent>
                                <Typography color="textSecondary">               
                                    <img src={state.profileImg} alt="logo" id="img" height="100%" width="100%"/>
                                </Typography>
                            </CardContent>
                        </Card>
                        <div className={classes.label} >
                            <input type="file" accept="image/*"  id="input" onChange={imageHandler} />
                                <div >
                                    <label htmlFor="input"></label>
                                </div>
                        </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Button>Przeprowadź proces</Button>
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
            maxWidth: 300,
            maxHeight: 300,
            textAlign: 'center'
        },
        label:{
            marginTop: '1rem',
        }
      }));
  export default ScanScreen;