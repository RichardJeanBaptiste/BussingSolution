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

    return (
        <Box sx={Styles.root}>
            <Typography align='center'>Login Page</Typography>
            <Box sx={Styles.login}>
                <TextField 
                    margin='dense' 
                    type='email' 
                    label='Email' 
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
                    label='Password' 
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
                    <Button>Login</Button>    
                </Box>
            </Box>
        </Box>
    )
}

export default Login