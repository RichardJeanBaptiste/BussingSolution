import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {

    const Styles = {
        root: {
            width: '100vw',
            height: '100vh',
            position: 'relative'
        },
        login: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            borderRadius: '20px',
            borderColor: 'black',
            borderStyle: 'solid',
            display: 'flex',
            flexDirection: 'column',
        },
        loginTopP: {
            marginTop: '5%'
        },
        loginForm: {
            marginTop: '2%',
            marginLeft: '7%',
            width: '85%',
            height: '13%',
            "& div": {
                borderRadius: '45px',
                height: '100%'
            }
        }
    }

    const [loginForm, setLoginForm] = useState({username: '', password: ''});

    const editLoginForm = (e) => {
        const { name, value } = e.target;
        
        setLoginForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    const SubmitForm = async () => {
        
        await fetch("http://localhost:5000/login/",{
            method: 'POST',
            body: JSON.stringify(loginForm),
        }).then((response) => {
            return response;
        }).then((data) => {
            console.log(data);
        })
    }

    return (
       <Box sx={Styles.root}>
            <Typography align='center'>Login Page</Typography>
            <Box sx={Styles.login}>
                <TextField 
                    margin='dense'
                    name="username"
                    value={loginForm.username} 
                    type='email' 
                    label='Email'
                    onChange={editLoginForm} 
                    sx={[Styles.loginForm, {marginTop: '30%'}]}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position='start'><EmailIcon/></InputAdornment>
                        }
                    }}
                />
                <TextField 
                    margin='dense' 
                    type='password'
                    name='password' 
                    label='Password'
                    value={loginForm.password}
                    onChange={editLoginForm} 
                    sx={Styles.loginForm}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position='start'><HttpsIcon/></InputAdornment>,
                            endAdornment: <InputAdornment position='end'> <IconButton aria-label='Hide Password'><VisibilityOffIcon/></IconButton></InputAdornment>
                        }
                    }}
                />
                <Button variant='text'>Forgot Password?</Button>

                <Box>
                    <Button onClick={SubmitForm}>Login</Button>    
                </Box>
            </Box>
        </Box>
    )
}

export default Login


/**
 * 
 * 
 */