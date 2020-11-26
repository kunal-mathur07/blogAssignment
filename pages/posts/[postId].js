import {useState,useEffect} from 'react';
import {useRouter} from 'next/router';
import s from '../../styles/post.module.css';
import {getPost} from '../../services/postService';
import Link from 'next/Link';
import { getUser } from '../../services/userService';
export default function PostId(postDetails){
    const [postData, setPostData] = useState(postDetails);
    const router = useRouter();
    const query = router.query;
    useEffect(()=>{
        async function loadPostData(){
            let post = await getPost(query.postId)
            setPostData(prev => prev = post);

        }  
        if(!postDetails) {
            loadPostData();
        }

    },[{}])

    const data = postData;
    return(
        
        <div>
            {data ?
            
        
        <div className={s.container}>
            <div className={s.row}>
                <h1>{data.title}</h1>
                
            
                <div>
                    {data.body}
                </div>
               
            </div>
            <div className={s.row}>
                <sub>Posted By: <span><strong>{data.user.name}</strong></span></sub>
            </div>
            <div className={s.row}>
                <div className={s.link}><Link href="/">Back</Link></div>
            </div>
                
            </div>:null
            }  
            <div className={s.userDetails}>

            </div>                                       
        </div>
    )
}

PostId.getInitialProps = async(ctx)=>{
    let post = await getPost(ctx.query.postId);
    if(post && post.userId){
        post.user = await getUser(post.userId);
    }
    return post;
}