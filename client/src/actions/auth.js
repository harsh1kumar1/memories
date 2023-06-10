import * as api from '../api/index.js';
import {AUTH} from '../constants/actionTypes' 

export const signin = (formData,history)=> async (dispatch) =>{
 try {
    //login  the  the user ...
    const {data} = await api.signIn(formData)
    dispatch({type:AUTH,data}); 

    history.push('/') //nagivate the user to the home page 
 } catch (error) {
    console.log(error);
 }
} 
export const signup = (formData,history)=> async (dispatch) =>{
 try {
    //logup  the  the user ...
    const {data} = await api.signUp (formData)
    dispatch({type:AUTH,data}); 
     
    history.push('/') //nagiva te the user to the home page 
 } catch (error) {
    console.log(error);
 }
} 
 