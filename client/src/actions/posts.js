import * as api from '../api'

export const getPosts = () => async(dispatch)=> {

    try {
        const {data} = await api.fetchPosts();

        dispatch({type:'FATCH_ALL', payload:data});
    } catch (error) {
      
        console.log(error)
    }
}

export const createPost = (post)=> async(dispatch)=>{
    try {
        const {data}=await api.createPost(post);

        dispatch({type:'CREATE',payload:data})
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id,post) => async (dispatch)=>{
 try {
  const {data}=  await api.updatePost(id,post ) //returning update memory

  dispatch({ type:'UPDATE' , payload:data});
 } catch (error) {
    console.log(error); 
 }
}

export const deletePost = (id) => async (dispatch) => {

    try {
        await api.deletePost(id);//we don't need to return any data so no need to create any variable  

        dispatch({type:'DELETE', payload: id}) //paylod is a interested data
         
    } catch (error) {
        
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: 'LIKE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };