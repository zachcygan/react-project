import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery,useMutation } from '@apollo/client';
import { GET_POSTS } from '../utils/queries'
import Posts from '../components/Posts';
import { Loader } from '../components';
import {AiFillLike} from 'react-icons/ai';
import { LIKE_POST } from '../utils/mutations';
import {BiCommentDetail,BiRepost} from 'react-icons/bi';
import {GrFavorite} from 'react-icons/gr';
import { GET_USERS } from '../utils/queries';
const CommunityPost = () => {
        

  const { loading, error, data } = useQuery(GET_POSTS);
  const [likePost,{error:likeError}] = useMutation(LIKE_POST);

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    if(data&&data.posts){
      setPosts(data.posts);
    }
  }, [data]);


  if(loading) return (<Loader/>)
 if(error){
    console.log(error)
    return<p>error</p>
 } ;
 if (likeError) {
  console.log(likeError);
  return <p>Error liking post</p>
}
 if(!data||!data.posts) return (<p>no post found</p>)
  // console.log(postData);
  const postData = data.posts;
  // console.log(postData);
  return (
    <div className=' flex flex-col'>
      <div className='w-full flex justify-between items-center bg-white'>
        <h1 className='font-extrabold text-[32px]'>Community</h1>
        <Link to='/createpost' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create Post</Link>
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Community</h2>
        
        {/* <p className="mt-2 text-lg leading-8 text-gray-600">
          Learn how to grow your business with our expert advice.
        </p> */}
      </div>
      <Posts posts={posts}/>

      {/* <div className="relative mt-8 flex items-center gap-x-4">
        <img src={post.user.profileImage} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a >
              <span className="absolute inset-0" />
              {post.user.username}
            </a>
          </p>
        </div>
      </div> */}
    </div>
  )
}


const like = () => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

};

export default CommunityPost;