
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


export const getPosts= async(req,res)=>{
    try {
      const postMessage=  await PostMessage.find();
      res.status(200).json(postMessage);
        
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const createPost = async (req, res) => {
  const post = req.body;
  

  const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}

// post/123
export const updatePost= async(req,res)=>{
  const {id:_id} = req.params; 
  const post =req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with thatn id')

   const updatePost=await PostMessage.findByIdAndUpdate(_id,post,{new: true})

   res.json(updatePost);
}

export const deletePost = async(req,res) => {

   const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id'); //to check id is valid
   await PostMessage.findByIdAndRemove(id)

   res.json({message:'post deleted sucessfully'});

}

export const likePost = async (req, res) => {
  const { id } = req.params;
   
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
   
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
  
  const post = await PostMessage.findById(id);
   
  const index = post.likes.findIndex((id) => id === String(req.userId));
   
  if (index === -1) {
    post.likes.push(req.userId); //like the post
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId)); //dislike the post
  }
   

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  
  res.json(updatedPost);
}