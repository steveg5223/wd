import React from 'react';
import Async from "react-async";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collection from './Collection';
import About from './About';
import DuJourWrapper from './DuJourWrapper';
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
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [updatedDate, setUpdatedDate] = React.useState(Date.now());
  const [requestedWatchId, setRequestedWatchId] = React.useState(null);

  const selectNewTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getAllWatches = async (props, { signal }) => {
    const res = await fetch(`/collection/phpsrc/getCollection.php`, { signal })
    if (!res.ok) throw new Error(res.statusText);
    return res.json()
  };

  const setDateWorn = async (watchId) => {
    const now = Math.round((new Date()).getTime() / 1000);
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
      <TabPanel value={selectedTab} index={0} heading={"You should really wear one of these..."}>
        <DuJourWrapper 
          setDateWorn={setDateWorn} 
          updatedDate={updatedDate}
          setRequestedWatchId={setRequestedWatchId}
          requestedWatchId={requestedWatchId}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} heading={"You need to buy another watch."}>
        <Async promiseFn={getAllWatches} >
          <Async.Pending>Loading...</Async.Pending>
          <Async.Fulfilled>
            {response => (
              <Collection 
              response={response} 
              setDateWorn={setDateWorn} 
              setRequestedWatchId={setRequestedWatchId}
              />
            )}
          </Async.Fulfilled>
          <Async.Rejected>{error => `Something went wrong: ${error.message}`}</Async.Rejected>
          </Async>
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
