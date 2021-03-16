import React from 'react';
import Async from "react-async";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DuJour from './DuJour';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadWatches = async ({ playerId }, { signal }) => {
    const res = await fetch(`/collection/watches.json`, { signal })
    if (!res.ok) throw new Error(res.statusText);
    return res.json()
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Du Jour" {...a11yProps(0)} />
          <Tab label="Collection" {...a11yProps(1)} />
          <Tab label="About" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Async promiseFn={loadWatches} playerId={1}>
          <Async.Pending>Loading...</Async.Pending>
          <Async.Fulfilled>
            {watches => (
              <DuJour watches={watches}/>
            )}
          </Async.Fulfilled>
          <Async.Rejected>{error => `Something went wrong: ${error.message}`}</Async.Rejected>
          </Async>
        

      </TabPanel>
      <TabPanel value={value} index={1}>
        Collection page content
      </TabPanel>
      <TabPanel value={value} index={2}>
        About page content
      </TabPanel>
    </div>
  );
}
