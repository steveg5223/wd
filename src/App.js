import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import About from './About';
import DuJourWrapper from './DuJourWrapper';
import CollectionWrapper from './CollectionWrapper'

function TabPanel(props) {
  const { children, value, index, heading, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography variant="h2" gutterBottom>
           {heading}
          </Typography>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [updatedDate, setUpdatedDate] = React.useState(Date.now());
  const [requestedWatchId, setRequestedWatchId] = React.useState(null);
  const [makes, setMakes] = React.useState([]);
  const [selectedMake, setSelectedMake] = React.useState('All');

  React.useEffect(() => {
    fetch('https://psenakwatch.com/collection/phpsrc/getMakes.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.watchList) {
          setMakes(data.watchList.map(item => item.make));
        }
      })
      .catch(err => {
        setMakes([]);
      });
  }, []);

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
  };

  const selectNewTab = (event, newValue) => {
    setSelectedTab(newValue);
    setRequestedWatchId(null);
  };

  const setDateWorn = async (watchId) => {
    const now = Math.round(Date.now() / 1000);
    const res = await fetch(`/collection/phpsrc/updateDateWorn.php`, { 
      method: 'POST',
      body: JSON.stringify({
        watchId : watchId,
        date: now,
        date_last_worn: now
      })
    })
    if (!res.ok) throw new Error(res.statusText);
    setUpdatedDate(Date.now());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={selectNewTab} aria-label="simple tabs example">
          <Tab label="Du Jour" {...a11yProps(0)} />
          <Tab label="Collection" {...a11yProps(1)} />
          <Tab label="About" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0} heading={"You should really wear one of these"}>
        <DuJourWrapper 
          setDateWorn={setDateWorn} 
          updatedDate={updatedDate}
          setRequestedWatchId={setRequestedWatchId}
          requestedWatchId={requestedWatchId}
          selectedMake={selectedMake}
          makes={makes}
          handleMakeChange={handleMakeChange}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} heading={"You should buy another watch."}>
        <CollectionWrapper 
          setDateWorn={setDateWorn} 
          setRequestedWatchId={setRequestedWatchId}
          requestedWatchId={requestedWatchId}
          selectedMake={selectedMake}
          makes={makes}
          handleMakeChange={handleMakeChange}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={2} heading={"About page content"}>
        <About />
      </TabPanel>
      <TabPanel value={selectedTab} index={3} heading={"About page content"}>
        <About />
      </TabPanel>
    </div>
  );
}
