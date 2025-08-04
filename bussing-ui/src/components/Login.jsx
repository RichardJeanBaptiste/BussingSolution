import { useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/**
 * Breakpoint	Screen width
  xs	0px+
  sm	600px+
  md	900px+
  lg	1200px+
  xl	1536px+
 */


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
            width: {
                xs: '60%',
                sm: '30%',
            },
            height: {
                xs: '50%',
                sm: '85%'
            },
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
            width: {
                xs: '83%',
                sm:'85%',
                md: '87%'
            },
            height: {
                xs: '10%',
                sm:'10%',
                md: '7%'
            },
            "& div": {
                borderRadius: '45px',
                height: '100%',
            },
            "& input": {
                fontSize: '12px'
            }
        },
        loginIcon: {
            xs: {
                fontSize: '14px'
            },
            sm: {
                fontSize: '18px'
            }
        },
        loginBtns : {
            position: 'relative',
            width: '100%',
            height: '20%'
        },
        Btns1: {
            position: 'absolute',
            top: {
                xs: '5%',
                sm: '5%',
            },
            left: {
                xs: '0%',
                sm: '0%',
                md: '4%'
            },
            fontSize: {
                xs: '8px',
                sm: '8px',
                md: '10px'
            }
        }, 
        Btns2: {
            position: 'absolute',
            top: {
                xs: '5%',
                sm: '5%',
            },
            right: {
                xs: '5%',
                sm: '5%',
                md: '7%'
            },
            fontSize: {
                xs: '8px',
                sm: '8px',
                md: '10px'
            },            
        }
    }

    let navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({username: '', password: ''});

    const editLoginForm = (e) => {
        const { name, value } = e.target;
        
        setLoginForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    const SubmitForm = async () => {

        if(loginForm.username == "" || loginForm.password == ""){
            alert('Username or Password required')
            return
        }
      
       await fetch("http://localhost:5000/login",{
           method: 'POST',
           body: JSON.stringify(loginForm),
           headers: {
               'Content-type': 'application/json'
           }
       })
       .then((response) => response.json())
       .then((data) => {
            console.log(data);

            if(data.status == 200){
                navigate("/dashboard")
            } else {
                alert("Login Unsuccessful")
            }   
       })
   }


    return (
       <Box sx={Styles.root}>
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
                            startAdornment: <InputAdornment position='start'><EmailIcon sx={Styles.loginIcon}/></InputAdornment>
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
                            startAdornment: <InputAdornment position='start'><HttpsIcon sx={Styles.loginIcon}/></InputAdornment>,
                            endAdornment: <InputAdornment position='end'> <IconButton aria-label='Hide Password'><VisibilityOffIcon sx={Styles.loginIcon}/></IconButton></InputAdornment>
                        }
                    }}
                />
                <Box sx={Styles.loginBtns}>
                    <Button onClick={SubmitForm} sx={Styles.Btns1}>Login</Button>  
                    <Button variant='text' color='error' sx={Styles.Btns2}>Forgot?</Button>
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