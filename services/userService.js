import {endpointConfig} from '../config/endpoints';

export const getUser = async(id)=>{
    try{
        const resp = await fetch(`${endpointConfig.user}${id}`);
        const user = await resp.json();
        return user[0];
    }catch(e){
        return null;
    }
}