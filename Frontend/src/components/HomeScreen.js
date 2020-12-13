import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { blue } from '@material-ui/core/colors';



function HomeScreen (props) {
    const classes = useStyles();

    
    return (
        <div>
            <React.Fragment>
            <CssBaseline />
                <Container fixed className={classes.containerB}>
                    <Grid container spacing = {2} className={classes.textPanel}>
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
                        <Grid item xs={6}>
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
        }
      }));
  export default HomeScreen;