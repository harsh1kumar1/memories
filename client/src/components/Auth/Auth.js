import React, { useEffect, useState } from 'react'
import { Avatar,Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Inputdoc'
import { useHistory } from 'react-router-dom';
import Icon from './icon'
import useStyle from './styles' 
import {gapi} from "gapi-script" 
import {useDispatch} from 'react-redux'
import { signin,signup } from '../../actions/auth';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
    const classes=useStyle();

    const [showPassword,setShowPassword] = useState(false);  
     const [formData,setFormData] = useState (initialState);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const [isSignup,SetIsSignup] = useState(false) 
    const dispatch=useDispatch(); 
    const history = useHistory();   

    const handleSubmit = (event)=>{
      event.preventDefault();
     
      if(isSignup){
        dispatch(signup(formData,history))
      } else{
        dispatch(signin(formData,history))
      } 
    };

    const handleChange =(event)=>{
       setFormData({...formData,[event.target.name]: event.target.value})
    };

    const switchMode = ()=>{
       SetIsSignup((prevIsSignup) =>!prevIsSignup)
       setShowPassword(false)
    }


    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch({ type: 'AUTH', data: { result, token } });
          history.push('/'); //once we login redirect to home page 
          
        } catch (error) { 
          console.log(error);
        }
      };
      const googleError = (error) =>{
        console.log(error);
        console.log("google is not sign  in ")
      }

      
      useEffect(() => {
        function start() {
        gapi.client.init({
     clientId :"clientId",
        scope: 'email',
          });
           }
          gapi.load('client:auth2', start);
           }, []);

  return (
    <Container component="main" maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/> 
            </Avatar>

            <Typography variant='h5'>{isSignup ? 'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                
                       { isSignup && (
                        <>
                          <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                          <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                        </>
                        )}
                    <Input name='email' label="Email Address" handleChange={handleChange} type='email'/>

                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignup ? 'Sign  Up' : 'Sign In'}
            </Button>

            <GoogleLogin 
                clientId="clientId"
                render={(renderProps)=>(
                    <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin" 
            />

           
            <Grid container justify='flex-end'>
                <button onClick={switchMode}>
                {isSignup ? 'Already have an account ? Sign In' : "don't have an account Sign Up"}

                </button>
            </Grid>
            </form>
        </Paper>
    </Container> 
  )
}

export default Auth
