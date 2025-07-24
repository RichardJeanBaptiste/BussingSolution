import { useState, useEffect, useRef } from 'react'
import { socket } from './socket';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';



function App() {

  const isListenerSet = useRef(false);

  const [isBussing, SetIsBussing] = useState(false);

  const [unavailableBusses, SetUnavailableBusses] = useState(['Bus1','Bus2','Bus3','Bus4','Bus5','Bus6']);

  const [availableBusses, SetAvailableBusses] = useState([]);

  
  useEffect(() => {
    
    if (!isListenerSet.current) {

      socket.on('CResonse', (json) => {
        console.log(json.data);
      })

      socket.on('start', () => {
        console.log('Start Event signaled front end');
        SetIsBussing(true);
      });

      socket.on('stop', () => {
        console.log('Stop Event front end');
        SetIsBussing(false);
      })
    }

    socket.on('bus_available', (name) => {
      console.log(name);

      let bus = unavailableBusses.filter(x => x !== name);
      SetUnavailableBusses(bus);

      let x = [...availableBusses];
      x.push(name);
      SetAvailableBusses(x);
    });

    socket.on('bus_unavailable', (name) => {
      console.log(name);

      let bus = availableBusses.filter(x => x !== name);
      SetAvailableBusses(bus);

      let y = [...unavailableBusses];
      y.push(name);
      SetUnavailableBusses(y);
    });

    isListenerSet.current = true;
  },[unavailableBusses, availableBusses]);

  
  const startBussing = () => {
    socket.emit('start_signal');
  }

  const stopBussing = () => {
    socket.emit('stop_signal');
    SetIsBussing(false);
  }

  const checkIfAvailable = (name) => {
    /**
     * if available return true
     * else false
    */
    let findAvailable = availableBusses.find((x) => {return x == name});

    if(findAvailable == undefined) {
      return false
    } else {
      return true;
    }
  }

  const busReady = (name) => {
    if(checkIfAvailable(name)){
      socket.emit('bus_return', name);
    } else {
      socket.emit('bus_ready', name);
    }
    
  }

  /**
   * TODO:
   *    Handle multiple same name creations 
   */
  const BusItem = ({name}) => {

    const moveToAvailable = () => {
      let bus = unavailableBusses.filter(x => x !== name);
      SetUnavailableBusses(bus);

      let x = [...availableBusses];
      x.push(name);
      SetAvailableBusses(x);
    }

    const moveToUnavailable = () => {
      let bus = availableBusses.filter(x => x !== name);
      SetAvailableBusses(bus);

      let y = [...unavailableBusses];
      y.push(name);
      SetUnavailableBusses(y);
    }



    return (
      <ListItem>
          <ListItemText onClick={() => busReady(name)}>{name}</ListItemText>
          <Button onClick={moveToAvailable}>Test Move</Button>
          <Button onClick={moveToUnavailable}>Test Return</Button>
      </ListItem>
    )
  }

  return (
    <>
      <Box>
        <Typography variant='h3' component="h3">Bussing Solutions</Typography>
        <Button onClick={() => checkIfAvailable('Bus1')}>Test Button</Button>
        <Stack direction='row' spacing={2}>
          <Button variant='contained' onClick={startBussing} color={isBussing ? 'success' : 'primary'}>Start</Button>               
          <Button variant='contained' onClick={stopBussing}>Stop</Button>
        </Stack>
        <Typography variant='body2' component="p">{isBussing}</Typography>

        {/** Map Through List Components to get name */}

        {/** Haven't Arrived */}
        <List>
            {unavailableBusses.map((x) => {
              return (
                <BusItem name={x} key={x}/>
              )
            })}
        </List>
        <Divider/>
        {/** Have Arrived */}
        <List>
            {availableBusses.map((x) => {
              return (
                <BusItem name={x} key={x}/>
              )
            })}
        </List>
      </Box>
    </>
  )
}

export default App
