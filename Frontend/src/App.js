import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import HomeScreen from './components/HomeScreen';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ScanScreen from './components/ScanScreen';
import ScanAllScreen from './components/ScanAllScreen';
import ChooseFileScreen from './components/ChooseFileScreen';

function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className="grid-container">
          <header className="header">
          <AppBar position="static">
            <Toolbar className={classes.bar}>
              <Typography variant="h2" className={classes.title}>
                <Link to="/" className={classes.link}>Human Face Experiment</Link>
              </Typography>
            </Toolbar>
          </AppBar>
          </header>
          <main className="main">
            <div className="components">
              <h2 className={classes.info}>
                Niniejsza strona internetowa pozwala na przeprowadzenie detekcji twarzy poprzez podanie <br/>
                obrazu w formacie jpg 
              </h2>
              <Route path="/" exact={true} component={HomeScreen}/>
              <Route path="/Scan" component={ScanScreen}/>
              <Route path="/ScanAll" component={ScanAllScreen}/>
              <Route path="/ChooseFile" component={ChooseFileScreen}/>
            </div>
          </main>
      </div>
    </BrowserRouter>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    padding: '1rem'

  },
  bar: {
    background: '#f0f0f0', 
    textAlign: 'center',
    color: '#707070',
    fontFamily: 'Arial'
  },
  info:{
    fontSize: "1.7rem",
    margin: theme.spacing(2),
    textAlign: "center",
    marginTop: "2%",
    color: '#707070',
},
link :{
  textDecoration: 'none',
  backgroundColor: 'transparent !important' ,
  fontFamily: "Arial",
  color: '#707070',
},
}));
export default App;
