import { useState, useEffect, useRef } from 'react'
import { socket } from '../socket';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Arrival() {

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

    return (
        <Box>
            <Typography variant='h3' component="h3">Arrivals</Typography>
            <Stack direction='row' spacing={2}>
                <Button variant='contained' onClick={startBussing} color={isBussing ? 'success' : 'primary'}>Start</Button>               
                <Button variant='contained' onClick={stopBussing}>Stop</Button>
            </Stack>
        </Box>
    )
}

export default Arrival;