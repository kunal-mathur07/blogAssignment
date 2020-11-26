import {endpointConfig} from '../config/endpoints';
export const getPosts = async()=>{
    try{
        const resp = await fetch(endpointConfig.posts);
        const posts = await resp.json();
        return posts;
    }catch(e){
        return null;
    }
}


export const getPost = async(id)=>{
    try{
        const resp = await fetch(`${endpointConfig.post}${id}`);
        const post = await resp.json();
        return post[0];
    }catch(e){
        return null;
    }
}