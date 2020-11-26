import Link from 'next/Link';
import { useState,useEffect } from 'react';
import classnames from 'classnames';
import s from '../styles/Home.module.css'
import {getPosts} from '../services/postService';

export default function Home(postsList) {
  const [posts,setPosts] = useState(postsList.postsList);

  useEffect(()=>{
    async function loadPosts(){
      let results = await getPosts();
      setPosts(prev=>prev = [...results]);
    }
    if(!postsList){
      loadPosts();
    }
  },[])


  return (
      <div className={s.container}>
            <h1>Posts</h1>
            <div className={classnames(s.row,s.header)}> 
              <div className={s.wd10}>Id</div>
              <div className={s.wd10}>User Id</div>
              <div>Title</div>
            </div>

          {posts.map((post)=>{
            return(
              <Link href={{pathname:'/posts/[postId]', query: {postId: post.id}}} key={post.id}>
                <div className={s.row}>
                  <div className={s.wd10}>{post.id}</div>
                  <div className={s.wd10}>{post.userId}</div>
                  <div>{post.title}</div>
              
                </div>
              </Link>)})}
      </div>
  )
}

Home.getInitialProps = async(ctx)=>{
  let postsList = await getPosts();
  return {postsList};
}
